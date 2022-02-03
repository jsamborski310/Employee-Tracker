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

    // db.query('SELECT * FROM employee', function (err, results) {
        
    //     console.log('\nALL EMPLOYEES\n')
    //     console.table(results);

    //     initialize();
    //   });

    const query = `SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager 
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id=employee.role_id)
    INNER JOIN department ON (department.id = role.department_id);
    `;

    console.log("the query:", query)
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


    
    







    //  ------ SELECT the existing department out of the `roles` table
        //  ------ .map( the results from `roles` to equestion data for inquirer)
        // ------- THEN prompt the user for role information (inquirer)
            //  ---- Take the users answers and INSERT them into the `role` tahle.

//  Add an employee - CREATE - INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)



//  Update an employee




// db.query = util.promisify( db.query);
//  Watch class video for how this is set up. This changes how to query, and allows for the use of async. 


// //  --->Do I need this now? See video
// db.query('SELECT * FROM employees' , (err, results) => {
//     console.log(err);
//     console.table(results);
// });

  
//  View all employees - READ - SELECT * FROM [table_name]
    // ------ Need to accomplish more than SELECT * FROM since employees doesn't have a department.





///////////////////////

//  See Unit 12, Day 2, 15: schema.sql. Create the table structure.
// See Unit 12, Day 2, 17: seeds.sql. Add dummy content to get started.
// Day 1, Inst 7, 9 Update
// Day 2 Lesson 11

//  Use JOIN to join in other roles to this table?

