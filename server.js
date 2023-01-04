const mysql = require ('mysql2');
const inquirer = require ('inquirer');
const consoleTable = require ('console.table');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      port: 3001,
      user: 'root',
      password: '112233',
      database: 'employee_db'
    });

  db.connect((err) => {
      if(err) {
          console.log("Unexpected Error in Connecting");
      } else {
          console.log("Welcome to the Employee Manager application!");
          console.log("Main Menu")
          promptUser();
      }
  });


  // Prompts for Terminal
  function promptUser(){
    
    inquirer.prompt([
        { 
            type: "list",
            name: "action",
            message: "Please pick from the list below what you would like to do today;",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Update an employee manager",
                "Delete an employee",
                "Delete a department",
                "Delete a role",
                "Exit application"
            ]
        }
    ]).then(function(choice){
        switch(choice.action){
            case "View all departments":
                viewDepartment();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateRole();
                break;
            case "Update an employee manager":
                updateManager();
                break;
            case "Delete an employee":
                deleteEmployee();
                break;
            case "Delete a department":
                deleteDepartment();
                break;
            case "Delete a role":
                deleteRole();
                break;
            case "Exit application":
                exitApp();

        }
    });
};

function viewDepartment(){
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

function viewEmployees(){
    let query = `
    SELECT e.id, e.first_name, e.last_name, roles.title, department.name AS department, salary, IFNULL(concat(m.first_name, ' ', m.last_name), 'N/A') AS manager
    FROM employee e
    LEFT JOIN employee m
    ON m.id = e.manager_id
    JOIN roles
    ON e.role_id = roles.id
    JOIN department
    ON roles.department_id = department.id;`
    db.query(query, function(err,results){
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

function addRole(){
    db.query(`SELECT * FROM department;`, (err, results) => {
        if (err) throw err;
        let departments = results.map(department => ({name: department.name, value: department.id }));
        inquirer.prompt([
            {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the new role you want to add?'   
            },
            {
            type: 'input',
            name: 'salaryAmount',
            message: 'What is the salary of the role you want to add?'   
            },
            {
            type: 'rawlist',
            name: 'deptName',
            message: 'Which department do you want to add this new role to?',
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
                    message: "Please enter the employee's first name"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Please enter the employee's last name"
                },
                {
                    type: "rawlist",
                    name: "employeeRole",
                    message: "What is the employee's role?",
                    choices: role
                },
                {
                    type: 'list',
                    name: 'employeeManager',
                    message: 'Who is the new employee\'s manager?',
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

function deleteEmployee(){
    db.query(`SELECT * FROM employee ORDER BY id ASC;`, (err,results) =>{
        if(err)throw err;
        let employees = results.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'employeeDelete',
                message: 'Please select an employee to delete from the database:',
                choices: employees
            },
        ]).then((answer) =>{
           
            db.query(`DELETE FROM employee WHERE ?`,
                [
                    {
                    id: answer.employeeDelete,
                }
                ],
                (err, response) =>{
                    if (err){
                        console.log("hm we seem to have run into an error trying to process your request")
                    }else{
                        console.log(`The employee has been successfully deleted.` );
                        viewEmployees();
                    }
                }   
            )
        })
    })
};

function deleteDepartment(){
    db.query(`SELECT * FROM department ORDER BY id ASC;`, (err, results) =>{
        if(err) throw err;
        let departments = results.map(department => ({name: department.name, value: department.id }));
        inquirer.prompt([
            {
                type: "rawlist",
                name: "deleteDepartment",
                choices: departments
            },
        ]).then((answer) =>{
            
            db.query(`DELETE FROM department WHERE ?`,
                [
                    {
                        id: answer.deleteDepartment,
                    }
                ],
                (err, response) =>{
                    if(err){
                        console.log("hm we seem to have run into an error trying to process your request")
                    }else{
                        console.log("The department has successfully been deleted.");
                        viewDepartment();
                    }
                }
            )
        })
    })
};

function deleteRole(){
    db.query(`SELECT * FROM roles ORDER BY id ASC`, (err, results) =>{
        if(err) throw err;
        let role = results.map(roles =>({name:roles.title, value: roles.id}));
        inquirer.prompt([
            {
                type: "rawlist",
                name: "deleteRole",
                choices: role
            },
        ]).then((answer) => {
            db.query(`DELETE FROM roles WHERE ?`,
            [
                {
                    id: answer.deleteRole,
                }
            ],
                (err, response) =>{
                    if(err){
                        console.log("hm we seem to have run into an error trying to process your request");
                    }else{
                    console.log("This role has been successfully deleted.");
                        viewRoles();
                    }
                }
            )
        })
    })
};

function updateRole(){
 db.query(`SELECT * FROM roles;`, (err,response) =>{
    if(err) throw err;
    let role = response.map(roles => ({name: roles.title, value: roles.id}));
    db.query(`SELECT * FROM employee;`, (err, response) =>{
        if(err) throw err;
        let employees = response.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
        inquirer.prompt([
            {
                type: "rawlist",
                name: "chooseEmployee",
                message: "Please select what employee you'd like to update",
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

function updateManager(){
    db.query(`SELECT * FROM employee;`, (err, results) => {
        if (err) throw err;
        managers = results.map(employee => ({name:employee.first_name + " " + employee.last_name, value: employee.id}));
        managers.push({name:"None"});

    inquirer.prompt([
        {
            type: "rawlist",
            name: "employee",
            message: "Who would you like to update?",
            choices: managers
        },
        {
            type: "rawlist",
            name: "manager",
            message: "Who is the new manager?",
            choices: managers
        }
    ]).then((answer) =>{
            if(answer.manager === "None"){
                answer.manager = null;
            }
            db.query(`UPDATE employee SET ? WHERE ?`,
            [
                {
                    manager_id: answer.manager,
                },
                {
                    id: answer.employee,
                }
            ],
            (err, response) =>{
                if(err){
                    console.log("hm we seem to have run into an error trying to process your request")
                }else{
                    console.log(`Success! \n ${answer.employee} manager updated to ${answer.manager}...\n`)
                    viewEmployees();
                }
            })  
        })
    })
};

function exitApp(){
    db.end();
    console.log("Thanks for stopping by!")
};
