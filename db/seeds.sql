INSERT INTO department (name)
VALUES
("Sales"),
("Engineering"),
("Marketing"),
("Accounting"),
("IT");

INSERT INTO role (title, salary, department_id)
VALUES
("Junior Sales Advisor", 50000.00, 1),
("Junior Engineer", 60000.00, 2),
("Junior Marketing Advisor", 40000.00, 3),
("Junior Accounting Advisor", 50000.00, 4),
("Junior IT Technician", 50000.00, 5),

("Senior Sales Advisor", 70000.00, 1),
("Senior Engineer", 85000.00, 2),
("Senior Marketing Advisor", 65000.00, 3),
("Senior Accounting Advisor", 65000.00, 4),
("Senior IT Advisor", 75000.00, 5),

("Sales Manager", 100000.00, 1),
("Engineer Manager", 115000.00, 2),
("Marketing Manager", 90000.00, 3),
("Accounting Manager", 105000.00, 4),
("IT Manager", 10000.00, 5);

INSERT INTO employee (first_name , last_name , role_id, manager_id)
VALUES
("Kevin", "Square", 01, null),
("Austin", "Circle", 02, 3),
("Kathy", "Octogon", 03, null),
("Amber", "Rectangle", 04, null),
("James", "Oval", 03, 4),
("Kelly", "Hexagon", 05, 2),
("Jasper", "Triangle", 01, 1),
("Angela", "Kite", 02, 5);