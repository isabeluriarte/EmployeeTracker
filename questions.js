const inquirer = require("inquirer");
const queries = require("./queries")

const ALL_EMPLOYEES = "View All Employees";
const ALL_DEPARTMENTS = "View All Departments";
const ALL_ROLES = "View All Roles";
const ADD_EMPLOYEE = "Add Employee";
const ADD_DEPARTMENT = "Add Department";
const ADD_ROLE = "Add Role";
const UPDATE_ROLE = "Update Employee Role";
const MAIN_MENU = "Main Menu";
const QUIT = "QUIT";

// START of main questions / prompts for user
function mainQuestionMenu() {
    return new Promise((resolve, reject) => {
        inquirer.prompt({
            message: "what would you like to do?",
            type: "list",
            pageSize: 10,
            choices: [
                ALL_EMPLOYEES,
                ALL_DEPARTMENTS,
                ALL_ROLES,
                ADD_EMPLOYEE,
                ADD_DEPARTMENT,
                ADD_ROLE,
                UPDATE_ROLE,
                QUIT
            ],
            name: "choice"
        }).then(answers => {
            
            // call out function based on user choice from prompts
            resolve(answers.choice)
        })
    })
};
// prompts for adding role
function roleOptions() {
    return new Promise((resolve, reject) => {
        inquirer.prompt({
            message: "What would you like to do?",
            type: "list",
            choices: [
                ADD_ROLE,
                MAIN_MENU
            ],
            name: "roleChoice"
        }).then(answers => {
            resolve(answers.roleChoice)
        })
    })
};

function newRole() {
    let role = { title: "", salary: "", departmentId: "" };
    let departmentList = [];
    let departments
    //Pulling from department table
    queries.departmentAll(true).then(results => {
        //results are what we pulled form table, and putting into departments array, has both name and id
        departments = results
        //looping through departments
        departments.forEach(department => {
            // taking department names and pushing into departmentList
            departmentList.push(department.name)
        })
    })

    return new Promise((resolve, reject) => {
        inquirer.prompt({
            type: "input",
            message: "Please enter new role",
            name: "roleName"
        }).then(answers => {
            role.title = answers.roleName;

            return inquirer.prompt({
                type: "input",
                message: "What is the salary?",
                name: "salary"
            })
        }).then(answers => {
            role.salary = answers.salary;

            return inquirer.prompt({
                type: "list",
                message: "Which department?",
                name: "deptChoice",
                choices: departmentList
            })
        }).then(answers => {
            // names and id, looping through
            departments.forEach(department => {
                // if user input matches name
                if (department.name == answers.deptChoice) {
                    // take id to update role
                    role.departmentId = department.id
                }
            })
            resolve(role)
        })
    })
};

function departmentOptions() {
    return new Promise((resolve, reject) => {
        inquirer.prompt({
            message: "what would you like to do?",
            type: "list",
            choices: [
                ADD_DEPARTMENT,
                MAIN_MENU
            ],
            name: "departmentChoice"
        }).then(answers => {
            // call out function based on user choice from prompts
            resolve(answers.departmentChoice)
        })
    })
};

function newDepartment() {
    return new Promise((resolve, reject) => {
        inquirer.prompt({
            type: "input",
            message: "Please enter new department name",
            name: "departmentName"
        }).then(answers => {
            resolve(answers.departmentName)
        })
    })

};
//======================================================
function employeeOptions() {
    return new Promise((resolve, reject) => {
        inquirer.prompt({
            message: "what would you like to do?",
            type: "list",
            choices: [
                ADD_EMPLOYEE,
                UPDATE_ROLE,
                MAIN_MENU
            ],
            name: "employeeChoice"
        }).then(answers => {
            // call out function based on user choice from prompts
            resolve(answers.employeeChoice)
        })
    })
};

function updateEmployeeRole() {
    let employee = { employeeId: "", roleId: "" }
    let roles
    let rolesList = [];
    queries.roleAll(true).then(results => {
        roles = results
        roles.forEach(role => {
            rolesList.push(role.title)
        })
    })
    return new Promise((resolve, reject) => {
        inquirer.prompt({
            message: "Enter the employee id",
            type: "input",
            name: "employeeId",
        }).then(answers => {
            employee.employeeId = answers.employeeId
            return queries.getEmployeeByID(answers.employeeId)
        }).then(results => {
            // console.log(results);

            return inquirer.prompt({
                type: "list",
                message: "Which role?",
                name: "roleChoice",
                choices: rolesList
            })
        }).then(answers => {
            roles
                .filter(role => role.title == answers.roleChoice)
                .forEach(role => {
                    employee.roleId = role.id
                })
            resolve(employee)
        })
    })
};

function newEmployee() {
    return new Promise((resolve, reject) => {
        inquirer.prompt({
            type: "input",
            message: "Please enter first name",
            name: "firstname"
        }).then(answers => {
            employee.first_name = answers.firstname;

            return inquirer.prompt({
                type: "input",
                message: "Please enter last name",
                name: "lastname"
            })
        }).then(answers => {
            employee.last_name = answers.lastname;

            return inquirer.prompt({
                type: "input",
                message: "Please enter role id",
                name: "roleid"
            })
        }).then(answers => {
            employee.role_id = answers.roleid;

            return inquirer.prompt({
                type: "input",
                message: "Please enter managers id",
                name: "managerid"
            })
        }).then(answers => {
            employee.manager_id = answers.manager_id;
            resolve(employee)
        })
    })

};
//============================================================
module.exports = {
    ALL_EMPLOYEES,
    ALL_DEPARTMENTS,
    ALL_ROLES,
    ADD_EMPLOYEE,
    ADD_DEPARTMENT,
    ADD_ROLE,
    UPDATE_ROLE,
    MAIN_MENU,
    QUIT,
    mainQuestionMenu,
    departmentOptions,
    newDepartment,
    roleOptions,
    newRole,
    employeeOptions,
    newEmployee,
    updateEmployeeRole
};