const allQuestions = require("./questions")
const queries = require("./queries")

mainMenu()
function mainMenu() {
    allQuestions.mainQuestionMenu().then(result => {
        switch (result) {
            case allQuestions.ALL_EMPLOYEES:
                viewEmployees()
                break;
            case allQuestions.ALL_DEPARTMENTS:
                viewDepartments()
                break;
            case allQuestions.ALL_ROLES:
                viewRoles()
                break;
            case allQuestions.ADD_EMPLOYEE:
                addEmployee()
                break;
            case allQuestions.ADD_DEPARTMENT:
                addDepartment()
                break;
            case allQuestions.ADD_ROLE:
                addRole()
                break;
            default:
                connection.end()
                break;
        }
    })
};

// also triggers roleOption so after viewing roles, they can choose to add role or go back to main menu
function viewRoles() {
    queries.roleAll().then(result => {
        console.table(result);
        // returns roleOption function from inq.js
        return allQuestions.roleOptions()
    }).then(result => {
        switch (result) {
            case allQuestions.MAIN_MENU:
                mainMenu()
                break;
            case allQuestions.ADD_ROLE:
                addRole()
                break;
        }
    })
};

function addRole() {
    allQuestions.newRole().then(result => {
        return queries.addRole(result.title, result.salary, result.departmentId)
    }).then(result => {
        viewRoles()
    })
};

function viewEmployees() {
    queries.employeeAll().then(result => {
        console.table(result);
        //===========================================
        return allQuestions.employeeOptions()
    }).then(result => {
        switch (result) {
            case allQuestions.MAIN_MENU:
                mainMenu()
                break;
            case allQuestions.ADD_EMPLOYEE:
                addEmployee()
                break;
            case allQuestions.UPDATE_ROLE:
                updateEmployeeRole()
                break;
        }
    })
    //=========================================
};

function updateEmployeeRole() {
    allQuestions.updateEmployeeRole().then(result => {
        return queries.updateEmployeeRole(result.employeeId, result.roleId)        
    }).then(result =>{
        viewEmployees()
    })
}

//=========================================
function addEmployee() {
    allQuestions.newEmployee().then(result => {
        return queries.addRole(result.first_name, result.last_name, result.role_id, result.manager_id)
    }).then(result => {
        viewEmployees()
    })
};

//==========================================

function viewDepartments() {
    queries.departmentAll().then(result => {
        console.table(result);
        return allQuestions.departmentOptions()
    }).then(result => {
        switch (result) {
            case allQuestions.MAIN_MENU:
                mainMenu()
                break;
            case allQuestions.ADD_DEPARTMENT:
                addDepartment()
                break;

        }
    })
};

function addDepartment() {
    allQuestions.newDepartment().then(result => {
        return queries.addDepartment(result)
    }).then(result => {
        viewDepartments()
    })
};