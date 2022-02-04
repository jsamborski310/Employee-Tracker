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

`npm install express` to collect user input.

`npm install uuid` to run unit tests.

## License

This application is covered under the MIT license.

## Usage

![Gif of the Note Taker in action.](./public/assets/images/Note-Taker-in-Action.gif)

Application is deployed to Heroku. 

Navigate to the page: https://js-note-taker-2022.herokuapp.com/. Click Get Started to to view the notes page.  

Right-click the application and open it in terminal. Enter a Title and a Description. When the note is completed, click the Save icon. The note will be added to the left panel. View previous notes by clicking on them. To Delete a saved note, click the trash icon. 


### Application Screenshots

Terminal View

![Screen shot of terminal displaying success in adding and deleting note.](./public/assets/images/Note-Taker-Terminal.png)



## Road Bumps

Added delete functionality for a better user experience. Wrote logic to search through the notes stored, find the matching id for the note selected for deletion, and used the splice method to remove the note from the array of existing notes. The road bump? In the initial phases, when deleted, the note would either be removed from the database OR the notes page, but not both. After several attempts, I wrote logic to delete the note from the database. During testing, I noticed that although the deleted note was removed from the database, it persisted on the notes page...that is...until a new note was added. Then the deleted note disappeared. Here's a snippet of the working code:

```
app.delete('/api/notes/:id', (req, res) => {

    const noteIndex = notes.findIndex(({id}) => id === req.params.id);

    if (noteIndex >= 0) {
        notes.splice(noteIndex, 1)

          fs.writeFile(
            './db/db.json', JSON.stringify(notes, null, 4), 
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully deleted note with ID:' + req.params.id)
          );

          res.sendStatus(204)
    }

});
```

And this is the line that did the magic. 

`res.sendStatus(204)`

Deleted items on the notes page persisted until the page was refreshed. This line of code validates the delete button click and instructs the application to run the above logic. 



## Preview

GitHub Repo: https://github.com/jsamborski310/Note-Taker

Heroku: https://js-note-taker-2022.herokuapp.com/

![Screen shot of Note Taker with no notes.](./public/assets/images/Note-Taker-Initial.png)
![Screen shot of Note Taker with no notes.](./public/assets/images/Note-Taker.png)


## Questions

For questions about this application or if you would like to collaborate, connect with me on <a href="https://www.linkedin.com/in/juanita-samborski/" target="_blank">Linkedin</a>.

