const mysql = require('mysql2');
const db = require('./db/connection');
const inquirer = require('inquirer');

//  Do this step twice for employees, etc. 
const departments = [
    {
        id: 1,
        name: "Sales"
    },
    {
        id: 2,
        name: "Accounting"
    }
]

//  --> map goes here
const choices = departments.map(department => {
    return {
        name: department.name,
        value: department.id
    }
})

const answers = await inquirer 
    .prompt([
        {
        type: "list",
        name: "department_id",
        question: "Choice a department",
        choices: [ 
            { name: "Sales", value: 1 },
            { name: "Accounting", value: 2}, 
            //  Look at video for choices. He condensed it into one variable
         
        ]

        }

        // --->Take the answers and...do something? 
    ])
    .then((answers) => {

    })


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


function viewAllDepartments() {


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