  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
# Employee Tracker

A command-line application that allows a business owner and/or human resources department to view and manage the company departments, roles and employees. 

## Description
This command-line application allows a user to view all departments, roles and employees, and also allows the user to update the information for each. The user is able to view important data about the various departments, the roles and associated salaries. Employee information include name, job title, department, salary, and manager name, if any. 

The information is displayed in a table, with properly titled columns, making it easy for the user to understand the data contained in each. 

This application was built using the following:

* MySQL
* Inquirer
* Javascript
* console.table


## Table of Contents

  * [Description](#description)
  * [Installation](#installation)
  * [License](#license)
  * [Usage](#usage)
  * [Road Bumps](#road-bumps)
  * [Preview](#preview)
  * [Questions](#questions)

## Installation

Clone the repository onto your local environment. 

The following dependancies, listed in `package.json` must be installed to run this application: 

* asciiart-logo
* console.table
* inquirer
* mysql2

Run the following code to install the dependancies: 

`npm install express` 


## License

This application is covered under the MIT license.

## Usage

![Gif of the Employee Tracker in action.](/assets/images/employee-tracker-demo.gif)

This is a command-line application. Once it has been cloned to your local environment, open the application. Run the following commands:

`mysql -u root -p` followed by your password to access MySQL.

`source schema.sql` followed by `source seeds.sql` to source the files. 

Right-click the index.js file and open it in terminal. Run `npm start`. Select an option from the list to get started. After providing an answer for each of the questions, a corresponding table will be displayed. 


### Application Screenshots

Terminal View

![Screen shot of terminal displaying employees table.](/assets/images/view-employees.png)

![Screen shot of terminal displaying roles table.](/assets/images/view-roles.png)

![Screen shot of terminal displaying departments table.](/assets/images/view-departments.png)


## Road Bumps

The following two snippets of code were headache inducing. In both of these instances, both a name and a value were being passed through a variable. The program will fail if the incorrect value is being INSERTED into a table. Before my aha moment (because I had commented out my `throw err` and couldn't figure out what was wrong), the employee name (a string) was being inserted. The column, however, calls for the `manager_id` -> an integer. After adding additional lines of code to grab the ID, the new employee was successfully added to the database. 

`db.query('INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?)', [employee.id, employee.first_name, employee.last_name, employee.role_id, managerID],`

Same issue here. `employee.id` was pulling through a string and not an integer. MySQL may throw an error if you compare a number with a string. It may look something like this: Truncated incorrect DOUBLE value. This was my first clue that I wasn't passing through the correct data, and a big learning moment. 

`db.query('UPDATE employee SET role_id = ${employee.role_id} WHERE id = ${employee.id}', `

During the building of this application, I stumbled over many road bumps, but these two ranked high on the list.  


## Preview

GitHub Repo: https://github.com/jsamborski310/Employee-Tracker


## Questions

For questions about this application or if you would like to collaborate, connect with me on <a href="https://www.linkedin.com/in/juanita-samborski/" target="_blank">Linkedin</a>.

