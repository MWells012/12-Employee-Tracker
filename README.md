# 12-Employee-Tracker

# Table of Contents
- [Description](#description)
- [User-Story](#user-story)
- [Installation](#Installation)
- [Usage](#Usage)
- [Tests](#Tests)
- [Mock-Up](#Mock-up)

# Description
This application is a Content Management System interface. This type of program/interface allow non-developer people to view and interact with information that has been stored in a database. This application is a command-line focused application that allows a company to manage their employee database.

# User Story 
+ AS A business owner
+ I WANT to be able to view and manage the departments, roles, and employees in my company
+ SO THAT I can organize and plan my business

# Installation
To run this application follow these steps:

    ```
    1. clone the repository using https or SSH
    2. run npm i
    ```
open mysql2 by using: mysql -u root -p

    ```
    1. enter your SQL password
    2. input source db/schema.sql
    3. use employee_db
    ```
Exit mysql by running "quit", then enter:

    ```
    1. npm run seed
    2. make sure you have a .env file with the structure:
    `- DB_name='employee_db'
     - DB_USER='root'
     - DB_PASSWORD='*this should be your personal sql password*'
    3. npm start or node server.js
    ```

# Usage
Once all the prompts have been answered in the terminal an index.html file will populate allowing you to have all the staffs information accessible from one spot.

# Tests


# Mock-Up