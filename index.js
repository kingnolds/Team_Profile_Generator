const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generate = require("./util/generateHtml");
const fs = require('fs');
const path = require('path');


const validateInput = (input) => input ? true : 'You cannot leave this field blank'
const validateNum = (input) => {
    if (input && !isNaN(input)) {
        return true
    } else if (!input){
        return 'You cannot leave this field blank'
    } else {
        return 'You must enter a Number'
    }
    
}
// console.log(validateInput('a'))
console.log(validateNum(1))
console.log(typeof(0))

const questions1 = [
    {
        type: 'input',
        message: "Name:",
        name: 'manager',
        validate: validateInput
    },
    {
        type: 'input',
        message: "Employee ID:",
        name: 'managerID',
        validate: validateNum
    },
    {
        type: 'input',
        message: "Email:",
        name: 'managerEmail',
        validate: validateInput
    },
    {
        type: 'input',
        message: "Office Number:",
        name: 'office',
        validate: validateNum
    },
    // {
    //     type: 'list',
    //     message: "Add Another Employee",
    //     name: 'role',
    //     choices: ['Engineer', 'Intern', 'No more Team Members']
    // }
]
const employeeQuestions = [
    {
        type: 'list',
        message: "Add Another Employee",
        name: 'role',
        choices: ['Engineer', 'Intern', 'No more Team Members']
    },
    {
        type: 'input',
        message: "Name:",
        name: 'employeeName',
        when: (answers) => (answers.role === 'Engineer' || answers.role === 'Intern'),
        validate: validateInput
    },
    {
        type: 'number',
        message: "Employee ID:",
        name: 'employeeID',
        when: (answers) => (answers.role === 'Engineer' || answers.role === 'Intern'),
        validate: validateNum
    },
    {
        type: 'input',
        message: "Email:",
        name: 'employeeEmail',
        when: (answers) => (answers.role === 'Engineer' || answers.role === 'Intern'),
        validate: validateInput
    },
    {
        type: 'input',
        message: "GitHub Username",
        name: 'github',
        when: (answers) => answers.role === 'Engineer',
        validate: validateInput
    },
    {
        type: 'input',
        message: "Intern's School",
        name: 'school',
        when: (answers) => answers.role === 'Intern',
        validate: validateInput
    },
]

// function isRole(aRole) {
//     return function (answers) {
//       return answers[aRole];
//     };
//   }

function writeToFile(fileName, data) {
    try {
        fs.writeFileSync(path.join(__dirname,"dist",`${fileName}.html`), generate(data));
      } catch(err) {
        // An error occurred
        console.error(err);
      }
    // fs.writeFileSync(`/teampage/${fileName}.html`, generate(data), (err) => err ? console.error(err) : console.log('Input Logged'))
}

const startUp = async () => {
    let teamMembers = []
    let newMember
    console.log("Enter The Team Manager's Information")
    const ans1 = await inquirer.prompt(questions1)
    const { manager, managerID, managerEmail, office } = ans1
    const teamLead = new Manager(manager, managerID, managerEmail, office)
    teamMembers.push(teamLead)
    console.log(teamLead)
    const addMember = async () =>{
        const ans2 = await inquirer.prompt(employeeQuestions)
        const { role, employeeName, employeeID, employeeEmail, github, school} = ans2
            switch(role) {
                case 'Engineer':
                    newMember = new Engineer(employeeName, employeeID, employeeEmail, github)
                    teamMembers.push(newMember)
                    console.log(newMember)
                    console.log(teamMembers)
                    addMember()
                    break;
                case 'Intern':
                    newMember = new Intern(employeeName, employeeID, employeeEmail, school)
                    teamMembers.push(newMember)
                    console.log(newMember)
                    console.log(teamMembers)
                    addMember()
                    break;
                case 'No more Team Members':
                        // TODO: create html here
                    const firName = teamLead.name.split(' ')[0]
                    writeToFile(`team${firName}`, teamMembers)
                    console.log('Your team page is ready in the dist directory!')
                    console.log(firName)
                    break;
                default: 
                    throw new Error('something broke')
            }
    }
    addMember()
}
startUp()