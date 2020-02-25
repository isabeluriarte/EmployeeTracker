DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);

-- So the tables aren't empty --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("Isabel", "Uriarte", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
values ("John", "Smith", 2, 1);

INSERT INTO role (title, salary, department_id)
values ("Manager", 350000, 1);
INSERT INTO role (title, salary, department_id)
values ("Engineer", 78000, 1);
INSERT INTO role (title, salary, department_id)
values ("Mechanic", 80000, 3);
INSERT INTO role (title, salary, department_id)
values ("Intern", 30000, 2);

INSERT INTO department (name)
values ("Engineering");
INSERT INTO department (name)
values ("Supply Chain");
INSERT INTO department (name)
values ("Manufacturing");