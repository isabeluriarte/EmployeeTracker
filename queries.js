const mysql = require('mysql');

const ROLE = "role";
const EMPLOYEE = "employee";
const DEPARTMENT = "department";

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");

});

function updateEmployeeRole(employeeId, roleId) {
    return runQuery(`
    #Update is picking the table
    UPDATE
        ${EMPLOYEE}
        #SET is setting to specific column in table
    SET
        role_id = ${roleId}
        #WHERE specifies so it doesn't update all
    WHERE
        id = ${employeeId}`)    
}

function getEmployeeByID(employeeId) {
    employeeId = connection.escape(employeeId)
    return runQuery(`SELECT * FROM ${EMPLOYEE} WHERE id = ${employeeId}`)
}

function roleAll(allColumns = false) {
    if (allColumns == true) {
        return runQuery(`SELECT * FROM ${ROLE}`)
    } else {
        return runQuery(`
    SELECT
        ${ROLE}.title,
        ${ROLE}.salary,
        ${DEPARTMENT}.name
    FROM ${ROLE}
    JOIN ${DEPARTMENT} ON
        ${DEPARTMENT}.id = ${ROLE}.department_id`)
    }

};

function addRole(title, salary, departmentId) {
    title = connection.escape(title);
    salary = connection.escape(salary);
    return runQuery(`INSERT INTO ${ROLE} (title, salary, department_id) VALUES (${title}, ${salary}, ${departmentId})`)

};

function employeeAll() {
    return runQuery(`
    SELECT
        ${EMPLOYEE}.id AS "Employee ID",
        ${EMPLOYEE}.first_name AS "First Name",
        ${EMPLOYEE}.last_name AS "Last Name",
        ${ROLE}.title AS "Role", 
        ${DEPARTMENT}.name AS "Department Name"
    FROM ${EMPLOYEE}
    JOIN ${ROLE} ON
        ${ROLE}.id = ${EMPLOYEE}.role_id
    JOIN ${DEPARTMENT} ON
        ${DEPARTMENT}.id = ${ROLE}.department_id`)
};
//================================================
function addEmployee(first_name, last_name, role_id, manager_id) {
    first_name = connection.escape(first_name);
    last_name = connection.escape(last_name);
    role_id = connection.escape(role_id);
    manager_id = connection.escape(manager_id);
    return runQuery(`INSERT INTO ${employee} (first_name, last_name, role_id, manager_id) VALUES (${first_name}, ${last_name}, ${role_id}, ${manager_id})`)

};
//================================================

function departmentAll(allColumns = false) {
    if (allColumns == true) {
        return runQuery(`SELECT * FROM ${DEPARTMENT}`)
    } else {
        return runQuery(`SELECT name FROM ${DEPARTMENT}`)
    }
};

function addDepartment(name) {
    // escape will clean user input so it can't break the database
    name = connection.escape(name)
    return runQuery(`INSERT INTO ${DEPARTMENT} (name) VALUES (${name})`)
};
// a function for dry code, can be used for connection.query in other functions
function runQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, function (err, data) {
            if (err) {
                reject(err)
            };
            resolve(data);
        })
    })
};

module.exports = {
    roleAll,
    employeeAll,
    departmentAll,
    addDepartment,
    addRole,
    addEmployee,
    getEmployeeByID,
    updateEmployeeRole
}