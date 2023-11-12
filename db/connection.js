const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "112233",
    database: "employee_db",
});

db.connect(function (err) {
    if (err) {
        console.log("Something went wrong while trying to connect. Please try again.");
    } else {
        console.log("Welcome to the Employee Manager Application!");
        console.log("Main Menu");
    }
});

module.exports = db;