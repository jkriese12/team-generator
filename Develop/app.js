const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const generateTeam = () => {
  inquirer
    .prompt([
      // Gathering all information for team member that will be constant
      {
        type: "input",
        message: "Please type in your name",
        name: "name",
      },
      {
        type: "input",
        message: "Please provide your email address",
        name: "email",
      },
      {
        type: "input",
        message: "Please provide your employee ID #",
        name: "id",
      },
      {
        type: "list",
        message: "What is your company role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then((response) => {
      if (response.role === "Manager") {
        inquirer.prompt([
          {
            type: "input",
            message: "Please enter your office number",
            name: "office",
          },
        ]);
      } else if (response.role === "Intern") {
        inquirer.prompt([
          {
            type: "input",
            message: "Which school do you attend?",
            name: "school",
          },
        ]);
      } else {
        inquirer.prompt([
          {
            type: "input",
            message: "What is your GitHub username? ",
            name: "git",
          },
        ]);
      }
      const html = () => {
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
          </head>
          <body>
            Hello
          </body>
        </html>`;
      };
    });
};
generateTeam();
