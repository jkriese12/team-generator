const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array holding all data
const fullTeam = [];
// Function to create file
const createFile = () => {
  fs.writeFile(outputPath, render(fullTeam), (err) =>
    err ? console.error(err) : console.log("It worked! Enjoy your team roster")
  );
};
// Main function running all prompts
const generateTeam = () => {
  inquirer
    .prompt([
      // Prompts for user for input, WHEN statements added to determine which questions to ask based on role choice
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
      {
        type: "input",
        message: "Please enter your office number",
        name: "office",
        when: (answer) => answer.role === "Manager",
      },
      {
        type: "input",
        message: "Which school did you attend?",
        name: "school",
        when: (answer) => answer.role === "Intern",
      },
      {
        type: "input",
        message: "What is your GitHub username",
        name: "git",
        when: (answer) => answer.role === "Engineer",
      },
      {
        type: "list",
        message: "Add another employee?",
        name: "continue",
        choices: ["Yes", "No"],
      },
    ])
    .then((response) => {
      // If else logic determing which class to direct input to based on user choice of role
      if (response.role === "Manager") {
        let roleChoice = new Manager(
          response.name,
          response.id,
          response.email,
          response.office
        );
        fullTeam.push(roleChoice);
      } else if (response.role === "Intern") {
        let roleChoice = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        fullTeam.push(roleChoice);
      } else {
        let roleChoice = new Engineer(
          response.name,
          response.id,
          response.email,
          response.git
        );
        fullTeam.push(roleChoice);
      }
      // Restarts function if user wants to add another user
      if (response.continue === "Yes") {
        generateTeam();
        // If user is done adding employees creates the HTML file
      } else {
        createFile();
      }
    });
};
generateTeam();
