const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "112233",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) {
        console.log("There was an unexpected error in connecting");
    } else {
        console.log("Welcome to the Employee Manager Application!");
        console.log("Main Menu")
        promptUser();
    }
});

module.exports = connection;