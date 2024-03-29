const inquirer = require ("inquirer");
const db = require("./db")
require("console.table");


init();

function init() {
    promptUser();
}


// Prompts for Terminal
function promptUser(){
    
    inquirer.prompt([
        { 
            type: "list",
            name: "action",
            message: "Please pick from the list below what you would like to do;",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                // {
                //     name: "View All Employees By Department",
                //     value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                // },
                // {
                //     name: "View All Employees By Manager",
                //     value: "VIEW_EMPLOYEES_BY_MANAGER"
                // },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                // {
                //     name: "Delete Employee",
                //     value: "DELETE_EMPLOYEE"
                // },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                // {
                //     name: "Update Employee Manager",
                //     value: "UPDATE_EMPLOYEE_MANAGER"
                // },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                // {
                //     name: "Delete Role",
                //     value: "DELETE_ROLE"
                // },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                // {
                //     name: "Delete Department",
                //     value: "DELETE_DEPARTMENT"
                // },
                {
                    name: "View Total Utilized Budget By Department",
                    value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
                },
                {
                    name: "Exit",
                    value: "EXIT"
                }
            ]
            }
        ]).then(function(choice){
            switch(choice.action){
                case "VIEW_EMPLOYEES":
                    viewEmployees();
                    break;
                // case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                //     viewEmployeesByDepartment();
                //     break;
                // case "VIEW_EMPLOYEES_BY_MANAGER":
                //     viewEmployeesByManager();
                //     break;
                case "ADD_EMPLOYEE":
                    addEmployee();
                    break;
                // case "DELETE_EMPLOYEE":
                //     deleteEmployee();
                //     break;
                case "UPDATE_EMPLOYEE_ROLE":
                    updateEmployeeRole();
                    break;
                // case "UPDATE_EMPLOYEE_MANAGER":
                //     updateEmployeeManager();
                //     break;
                case "VIEW_DEPARTMENTS":
                    viewDepartments();
                    break;
                case "ADD_DEPARTMENT":
                    addDepartment();
                    break;
                // case "DELETE_DEPARTMENT":
                //     deleteDepartment();
                //     break;
                case "VIEW_ROLES":
                    viewRoles();
                    break;
                case "ADD_ROLE":
                    addRole();
                    break;
                // case "DELETE_ROLE":
                //     deleteRole();
                //     break;
                case "EXIT":
                    exitApp();
            }
        }
        )
    }
    
function viewEmployees(){
    db.findAllEmployees()
};

// function deleteEmployee(){
//     db.query(`SELECT * FROM employee ORDER BY id ASC;`, (err,results) =>{
//         if(err)throw err;
//         let employees = results.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee.id}));
//         inquirer.prompt([
//             {
//                 type: "rawlist",
//                 name: "employeeDelete",
//                 message: "Please select an employee to delete from the database:",
//                 choices: employees
//             },
//         ]).then((answer) =>{
        
//             db.query(`DELETE FROM employee WHERE ?`,
//                 [
//                     {
//                     id: answer.employeeDelete,
//                 }
//                 ],
//                 (err, response) =>{
//                     if (err){
//                         console.log("hm we seem to have run into an error trying to process your request")
//                     }else{
//                         console.log(`The employee has been successfully deleted.` );
//                         viewEmployees();
//                     }
//                 }   
//             )
//         })
//     })
// };

function updateEmployeeRole(){
    db.query(`SELECT * FROM roles;`, (err,response) =>{
        if(err) throw err;
        let role = response.map(roles => ({name: roles.title, value: roles.id}));
       db.query(`SELECT * FROM employee;`, (err, response) =>{
            if(err) throw err;
            let employees = response.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee.id}));
            inquirer.prompt([
                {
                    type: "rawlist",
                    name: "chooseEmployee",
                    message: "Please select what employee youd like to update",
                    choices: employees
                },
                {
                    type: "rawlist",
                    name: "chooseNewRole",
                    message: "Select a role",
                    choices: role
                },
            ]).then((answer) => {
                    db.query(`UPDATE employee SET ? WHERE ?`,
                    [
                        {
                        role_id: answer.chooseNewRole,
                        },
                        {
                            id: answer.chooseEmployee,
                        },
                    ],
                    (err, response) =>{
                        if(err){
                            console.log("hm we seem to have run into an error trying to process your request")
                        }else{
                            console.log("The role has been successfully updated!");
                            viewRoles();
                        }
                    })   
                })
            })
        })
};

// function updateEmployeeManager(){
//     db.query(`SELECT * FROM employee;`, (err, results) => {
//         if (err) throw err;
//         managers = results.map(employee => ({name:employee.first_name + " " + employee.last_name, value: employee.id}));
//         managers.push({name:"None"});

//     inquirer.prompt([
//         {
//             type: "rawlist",
//             name: "employee",
//             message: "Who would you like to update?",
//             choices: managers
//         },
//         {
//             type: "rawlist",
//             name: "manager",
//             message: "Who is the new manager?",
//             choices: managers
//         }
//     ]).then((answer) =>{
//             if(answer.manager === "None"){
//                 answer.manager = null;
//             }
//             db.query(`UPDATE employee SET ? WHERE ?`,
//             [
//                 {
//                     manager_id: answer.manager,
//                 },
//                 {
//                     id: answer.employee,
//                 }
//             ],
//             (err, response) =>{
//                 if(err){
//                     console.log("hm we seem to have run into an error trying to process your request")
//                 }else{
//                     console.log(`Success! \n ${answer.employee} manager updated to ${answer.manager}...\n`)
//                     viewEmployees();
//                 }
//             })  
//         })
//     })
// };

function viewRoles(){
    let query = "SELECT * FROM roles";
    db.query(query, function(err,results){
        if(err){
            console.log(err)
        }else{
            console.table(results)
            promptUser();
        };
    });
};

function addRole(){
    db.query(`SELECT * FROM department;`, (err, results) => {
        if (err) throw err;
        let departments = results.map(department => ({name: department.name, value: department.id }));
        inquirer.prompt([
            {
            type: "input",
            name: "newRole",
            message: "What is the name of the new role you want to add?"   
            },
            {
            type: "input",
            name: "salaryAmount",
            message: "What is the salary of the role you want to add?"   
            },
            {
            type: "rawlist",
            name: "deptName",
            message: "Which department do you want to add this new role to?",
            choices: departments
            },
        ]).then((answer) => {
            db.query(`INSERT INTO roles SET ?`, 
            {
                title: answer.newRole,
                salary: answer.salaryAmount,
                department_id: answer.deptName,
            },
            (err, response) => {
                if (err){
                    console.log("hm we seem to have run into an error trying to process your request");
                }else{
                console.log(`\n ${answer.title} successfully added to database! \n`);
                viewRoles();
                }
            });
        });
    });
};

// function deleteRole(){
//     db.query(`SELECT * FROM roles ORDER BY id ASC`, (err, results) =>{
//         if(err) throw err;
//         let role = results.map(roles =>({name:roles.title, value: roles.id}));
//         inquirer.prompt([
//             {
//                 type: "rawlist",
//                 name: "deleteRole",
//                 message: "who needs to be deleted?",
//                 choices: role
//             },
//         ]).then((answer) => {
//             db.query(`DELETE FROM roles WHERE ?`,
//             [
//                 {
//                     id: answer.deleteRole,
//                 }
//             ],
//                 (err, response) =>{
//                     if(err){
//                         console.log("hm we seem to have run into an error trying to process your request");
//                     }else{
//                     console.log("This role has been successfully deleted.");
//                         viewRoles();
//                     }
//                 }
//             )
//         })
//     })
// };

function viewDepartments(){
    let query = "SELECT * FROM department";
    db.query(query, function(err, results){
        if(err){
            console.log(err)
        }else{
            console.table(results)
            promptUser();
        };
        
    });
};

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "newDeptName",
            message: "What is the name of the new department you would like to add?",
        }
    ]).then((answer) =>{
            db.query(`INSERT INTO department SET ?`, 
            {
                name: answer.newDeptName,
            },
            (err, response) =>{
                if (err){
                    console.log("hm we seem to have run into an error trying to process your request")
                }else{
                    console.log("New department has been successfully added!");
                    viewDepartment();
                }
            })
        });
};

// function deleteDepartment(){
//     db.query(`SELECT * FROM department ORDER BY id ASC;`, (err, results) =>{
//         if(err) throw err;
//         let departments = results.map(department => ({name: department.name, value: department.id }));
//         inquirer.prompt([
//             {
//                 type: "rawlist",
//                 name: "deleteDepartment",
//                 choices: departments
//             },
//         ]).then((answer) =>{
            
//             db.query(`DELETE FROM department WHERE ?`,
//                 [
//                     {
//                         id: answer.deleteDepartment,
//                     }
//                 ],
//                 (err, response) =>{
//                     if(err){
//                         console.log("hm we seem to have run into an error trying to process your request")
//                     }else{
//                         console.log("The department has successfully been deleted.");
//                         deleteDepartment();
//                     }
//                 }
//             )
//         })
//     })
// };

function addEmployee(){
    db.query(`SELECT * FROM roles;`, (err, results) =>{
        if(err) throw err;
        let role = results.map(roles => ({name: roles.title, value: roles.id}));
        db.query(`SELECT * FROM employee WHERE manager_id IS NULL;`, (err, results) => {
            if (err) throw err;
            managers = results.map(employee => ({name:employee.first_name + " " + employee.last_name, value: employee.id}));
            managers.push({name:"None"});
            
            inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "Employee's first name?"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Employee's last name?"
                },
                {
                    type: "rawlist",
                    name: "employeeRole",
                    message: "Employee's role?",
                    choices: role
                },
                {
                    type: "list",
                    name: "employeeManager",
                    message: "Employee\"s manager?",
                    choices: managers
                }
            ]).then((answer) => {
                if(answer.employeeManager === "None"){
                    answer.employeeManager = null;
                }
                db.query(`INSERT INTO employee SET ?`,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.employeeRole,
                    manager_id: answer.employeeManager
                },
            
                (err,response) =>{
                    if(err){
                        console.log("hm we seem to have run into an error trying to process your request")
                    }else{
                        console.log(`\n ${answer.firstName} ${answer.lastName} successfully added to database! \n`);
                        viewEmployees();
                    }
                })
            })
        })
    })

};

function exitApp(){
    console.log("Thanks for stopping by!");
    db.end();
};
