DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,

    PRIMARY KEY (id),

    FOREIGN KEY (department_id)
    REFERENCES department (id)
    ON DELETE SET NULL

);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,

    PRIMARY KEY (id, role_id, manager_id)

    -- CONSTRAINT fk_employeeRole
        FOREIGN KEY (role_id)
        REFERENCES role (id)
            ON UPDATE CASCADE,

    -- CONSTRAINT fk_employeeManager
        FOREIGN KEY (manager_id)
        REFERENCES employee (id)
            ON DELETE CASCADE

);

