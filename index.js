const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const startUp = () => {
    console.log("Enter The Team Manager's Information")
    const ans1 = await inquirer.prompt([
        {
            type: 'input',
            message: "Name:",
            name: 'manager'
        },
        {
            type: 'number',
            message: "Employee ID:",
            name: 'managerID'
        },
        {
            type: 'input',
            message: "Email:",
            name: 'managerEmail'
        },
        {
            type: 'input',
            message: "Office Number:",
            name: 'office'
        },
        {
            type: 'list',
            message: "Add Another Employee",
            name: 'role',
            choices: ['Engineer', 'Intern', 'No more Team Members']
        }
    ]).then((response) => {
        const manager = new Manager(response.manager, response.managerID, response.managerEmail, response.office)
        
    })
    
}