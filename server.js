const mysql = require ('mysql2');
const inquirer = require ('inquirer');
const consoleTable = require ('console.table');
const express = require('express');



//const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      port: 3001,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employee_db'
    },
    console.log(`Connection successful to the employee_db database.`)
  );

  db.connect((err) => {
      if(err) {
          console.log("Unexpected Error in Connecting");
      } else {
          console.log("Connection Successful. Welcome to the Employee Manager.");
          console.log("Main Menu")
          promptUser();
      }
  });
  
  