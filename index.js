var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

function start(){
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "start",
        choices: [
            "Add department",
            "Add role", "Add employee", "View departments", "View roles", "View employees", "Update employee roles", "Exit"]
    }).then(function(answer){
        switch (answer.start) {
            case "Add department":
                addDepartment();
                break;

            case "View departments":
                viewDepartments();
                break;
        
            default:
                connection.end();
                break;
        }
    })
}

function viewDepartments(){
    connection.query("SELECT * FROM departments", function(err, res){
        if (err) throw err;
        console.table(res);
        start();
    })
}

//SELECT departments.name FROM roles LEFT JOIN departments WHERE roles.department_id = departments.id

function addDepartment(){
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name:"name"
    }).then(function(answer){
        connection.query("INSERT INTO departments SET ?",
        answer,
        function(err, res){
            if (err) throw err;
            console.log("Deparment Added!")
            start();
        })
    })
}

// let viewDepartments = function(){

// }

// let viewDepartments = ()=>{

// }