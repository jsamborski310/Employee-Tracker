const mysql = require('mysql2');
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const connection = require('./db/connection');
// require('console.table');


const departments = [
        {
            id: 1,
            name: "Human Resources"
        },
        {
            id: 2,
            name: "Creative"
        },
        {
            id: 3,
            name: "Software Engineering"
        },
        {
            id: 4,
            name: "Marketing"
        },
        {
            id: 5,
            name: "IT"
        }
    ]

const choices = departments.map(department => {
    return {
        name: department.name,
        value: department.id
    }
})

let init = {
    viewEmployees: "View All Employees",
    addEmployee: "Add Employee",
    updateEmployeeRole: "Update Employee Role",
    viewRoles: "View All Roles",
    addRole: "Add Role",
    viewDepartments: "View All Departments",
    addDepartment: "Add Department"
}


initialize();

async function initialize() {
const answers = await inquirer 
    .prompt([
        {
            name: "init",
            type: "list",
            message: "What would you like to do?",
            choices: [ 
                init.viewEmployees,
                init.addEmployee,
                init.updateEmployeeRole,
                init.viewRoles,
                init.addRole,
                init.viewDepartments,
                init.addDepartment

                //  Look at video for choices. He condensed it into one variable
            ]
        }
        
    ]) 

        .then((answers) => {

        switch (answers.init) {
            case init.viewDepartments:
                viewAllDepartments();
                break;

            case init.viewEmployees:
                viewAllEmployees();
                break;

            case init.viewRoles:
                viewAllRoles();
                break;

            case init.addDepartment:
                addNewDept();
                break;

            case init.addRole:
                addNewRole();
                break;

            case init.addEmployee:
                addNewEmployee();
                break;

            case init.updateEmployeeRole:
                updateEmployeeRole();
                break;

        }
    })
}



async function addNewDept() {
    const answersDept = await inquirer 
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the department?",
            },
            {
                type: "input",
                name: "id",
                message: "Enter the department id.",
            }
            
        ]) 
        .then((answersDept) => {

            departments.value = answersDept.id;
            departments.name = answersDept.name;

            addDepartment();
            viewAllDepartments();
            
        })
    }


//  VIEWING DATA

function viewAllDepartments(answersDept) {

        db.query('SELECT * FROM department', function (err, results) {
            
            console.log('\nALL DEPARTMENTS\n')
            console.table(results);

            initialize();
          });

}


function viewAllEmployees(answers) {


    const query = `SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager 
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id=employee.role_id)
    INNER JOIN department ON (department.id = role.department_id);
    `;

        db.query(query, (err,results) => {

            // error
            console.log('\nALL EMPLOYEES\n')
            console.table(results);

            initialize();

        }
    
    )

}

function viewAllRoles(answers) {

    db.query(       
        'SELECT * FROM role', 
    
        function (err, results) {
        
            console.log('\nALL ROLES\n')
            console.table(results);

            initialize();
      });

}

// CREATING/UPDATING

function addDepartment(answersDept) {
   
    console.log("\nYou have added", departments.name, "to the database.\n"); 

    db.query(
        `INSERT INTO department (id, name) VALUES (${departments.value}, "${departments.name}");`, 
        
        function (err, results) {
        
            console.log('\nUPDATED DEPARTMENTS\n')
            console.table(results);

            
      });

}


function addNewRole() {


    db.query('SELECT * FROM department', async (err, deptData) => {
        const departmentArray = await deptData.map(({ id, name }) => ({
            value: id,
            name: name
        }));
 

        const answersRole = inquirer 
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the name of the role?",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary of the role?",
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentArray,
                },
                {
                    type: "input",
                    name: "role_id",
                    message: "Provide the role ID.",
                }
                
            ]) 
            .then((answersRole) => {

                const roles = {
                        title: answersRole.title,
                        salary: answersRole.salary,
                        department_id: answersRole.department_id,
                        id: answersRole.role_id
                    }

                console.log("\nYou have added a new", roles.title, "role to the database.\n"); 
    
                db.query(
                `INSERT INTO role (id, title, salary, department_id) VALUES (${roles.id}, "${roles.title}", ${roles.salary}, ${roles.department_id});`, 
                
                function (err, results) {

                    // if (err) {
                    //     throw err;
                    // }

                    console.log('\nUPDATED ROLE\n')
                    console.table(results);
                            
                    viewAllRoles();  
                        
                    });

            })

        }

    )   

}


    
function addNewEmployee() {

    


    db.query('SELECT * FROM role', (err, roleData) => {
        const roles = roleData.map(({ id, title }) => ({
            value: id,
            name: title
        }));
 
        console.log("roles ", roles)

    db.query('SELECT * FROM employee', (err, employeeData) => {
        const employees = employeeData.map(employeeData => 
            `${employeeData.first_name} ${employeeData.last_name}`);


            console.log("employees: ", employees)
    
        const answers = inquirer 
            .prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "What is the employee's first name?",
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the employee's last name?",
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "What is the employee's role?",
                    choices: roles,
                },
                {
                    type: "list",
                    name: "manager_id",
                    message: "Who is the employee's manager?",
                    choices: employees,
                },
                {
                    type: "input",
                    name: "id",
                    message: "What is the employee ID?",
                }

                
            ]) 
            .then((answers) => {

                const employee = {
                        first_name: answers.first_name,
                        last_name: answers.last_name,
                        role_id: answers.role_id,
                        manager_id: answers.manager_id,
                        id: answers.id
                    }

                // console logs
                console.log("employee :", employee)
                console.log("employeeID:", employee.id, "employeeFirstName:", employee.first_name, "employeeLastName", employee.last_name, "employeeRole", employee.role_id, "employeeManager", employee.manager_id)



                console.log("\nYou have added ", employee.first_name, employee.last_name, "to the employee's database.\n"); 


    
                db.query(
                `INSERT INTO role (id, first_name, last_name, role_id, manager_id) VALUES (${employee.id}, "${employee.first_name}", "${employee.last_name}", ${employee.role_id}, "${employee.manager_id}");`, 
                
                function (err, results) {

                    // if (err) {
                    //     throw err;
                    // }


                console.log("AFTER QUERY: employeeID:", employee.id, "employeeFirstName:", employee.first_name, "employeeLastName", employee.last_name, "employeeRole", employee.role_id, "employeeManager", employee.manager_id)

                    console.log('\nUPDATED ROLE\n')
                    console.table(results);
                    // return results 
                    
                    viewAllEmployees(); 
                    
                        
                    });

                    
                    
            })


        })

        })
        // console.log("New employee: ", addNewEmployee())
        
    }



function updateEmployeeRole () {


    db.query('SELECT * FROM role', async (err, roleData) => {
        const selectRole = await roleData.map(({ id, title }) => ({
            value: id,
            name: title
        }));

    db.query('SELECT * FROM employee', async (err, employeeData) => {
        const selectEmployee = await employeeData.map(employeeData => 
            `${employeeData.first_name} ${employeeData.last_name}`);



        const answers = inquirer 
            .prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Select employee to update role.",
                    choices: selectEmployee
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "What is the employee's new role?",
                    choices: selectRole,
                }
 
            ]) 
            .then((answers) => {

                const employee = {
                        id: answers.employee,
                        role_id: answers.role_id,
                    }


                console.log("\nYou have updated ", employee.id, "'s role.\n"); 
    
                db.query(
                    `UPDATE employees SET role_id = ? WHERE id = ?', [employee.role_id, employee.id]`, 
                
                function (err, results) {

                    // if (err) {
                    //     throw err;
                    // }

                    console.log('\nUPDATED EMPLOYEE ROLE\n')
                    console.table(results);
                            
                    viewAllEmployees();  
                        
                          
                });
            })


        })

        })
        
    }
    



///////////////////////////////

// async function addNewEmployee() {


//     db.query('SELECT * FROM role', async (err, roleData) => {
//         const roles = await roleData.map(({ id, title }) => ({
//             value: id,
//             name: title
//         }));
 

//     db.query('SELECT * FROM employee', async (err, employeeData) => {
//         const employees = await employeeData.map(employeeData => 
//             `${employeeData.first_name} ${employeeData.last_name}`);


    
//         try {
//             const answers = await inquirer 
//             .prompt([
//                 {
//                     type: "input",
//                     name: "first_name",
//                     message: "What is the employee's first name?",
//                 },
//                 {
//                     type: "input",
//                     name: "last_name",
//                     message: "What is the employee's last name?",
//                 },
//                 {
//                     type: "list",
//                     name: "role_id",
//                     message: "What is the employee's role?",
//                     choices: roles,
//                 },
//                 {
//                     type: "list",
//                     name: "manager_id",
//                     message: "Who is the employee's manager?",
//                     choices: employees,
//                 },
//                 {
//                     type: "input",
//                     name: "id",
//                     message: "What is the employee ID?",
//                 }

                
//             ]) 
            

//                 const employee = {
//                         first_name: answers.first_name,
//                         last_name: answers.last_name,
//                         role_id: answers.role_id,
//                         manager_id: answers.manager_id,
//                         id: answers.id
//                     }

            
//                 console.log("\nYou have added ", employee.first_name, employee.last_name, "to the employee's database.\n"); 
    
//                 db.query(
//                 `INSERT INTO role (id, first_name, last_name, role_id, manager_id) VALUES (${employee.id}, "${employee.first_name}", "${employee.last_name}", ${employee.role_id}, "${employee.manager_id}");`)
                
                
//                     console.log('\nUPDATED ROLE\n')
                    
                            
//                     viewAllEmployees();  
//         }
//         catch(err) {
//             console.log(err);
//         }


//         })

//         })
        
//     }

///////////////////////////////