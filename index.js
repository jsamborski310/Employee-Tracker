const mysql = require('mysql2');
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table')
// require('console.table');

//  Do this step twice for employees, etc. 
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

// //  --> map goes here
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
        // },
        // {
        //     type: "list",
        //     name: "department_id",
        //     message: "Select a department",
        //     choices: [ 
        //         { name: "Human Resources", value: 1 },
        //         { name: "Creative", value: 2}, 
        //         { name: "Software Engineering", value: 3}, 
        //         { name: "Marketing", value: 4 },
        //         { name: "IT", value: 5}
        //         //  Look at video for choices. He condensed it into one variable
        //     ]
        }


        // --->Take the answers and...do something? 

        
    ]) 

        .then((answers) => {
            
        // console.log(answers.init);

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

        }
    })
}



    // console.log(answers.init);

    // .then((answers) => {
        // console.log(answers.init);

    // })


// db.query = util.promisify( db.query);
//  Watch class video for how this is set up. This changes how to query, and allows for the use of async. 


// //  --->Do I need this now? See video
// db.query('SELECT * FROM employees' , (err, results) => {
//     console.log(err);
//     console.table(results);
// });

//  Present user with options
    // TO DO: Start with What would you like to do? Then display questions based   on that.


//  View all departments - READ - SELECT * FROM departments


function viewAllDepartments(answers) {

        db.query('SELECT * FROM department', function (err, results) {
            
            console.log('\nALL DEPARTMENTS\n')
            console.table(results);

            initialize();
          });

}


function viewAllEmployees(answers) {

    db.query('SELECT * FROM employee', function (err, results) {
        
        console.log('\nALL EMPLOYEES\n')
        console.table(results);

        initialize();
      });

}

function viewAllRoles(answers) {

    db.query('SELECT * FROM role', function (err, results) {
        
        console.log('\nALL ROLES\n')
        console.table(results);

        initialize();
      });

}

//  View all roles - READ - SELECT * FROM [table_name]

//  View all employees - READ - SELECT * FROM [table_name]
    // ------ Need to accomplish more than SELECT * FROM since employees doesn't have a department.




//  Add a department  - CREATE - INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)

//  Add a role - CREATE - INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)

async function createRole() {


}


    //  ------ SELECT the existing department out of the `roles` table
        //  ------ .map( the results from `roles` to equestion data for inquirer)
        // ------- THEN prompt the user for role information (inquirer)
            //  ---- Take the users answers and INSERT them into the `role` tahle.

//  Add an employee - CREATE - INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)



//  Update an employee


///////////////////////

//  See Unit 12, Day 2, 15: schema.sql. Create the table structure.
// See Unit 12, Day 2, 17: seeds.sql. Add dummy content to get started.
// Day 1, Inst 7, 9 Update
// Day 2 Lesson 11

//  Use JOIN to join in other roles to this table?

//  mysql2 prepared statements. See npm for mysql2. See connection.execute