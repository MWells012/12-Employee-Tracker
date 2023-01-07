use employees;

INSERT INTO department 
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Marketing'),
    ('Accounting'),
    ('IT');

INSERT INTO role 
    (title, salary, department_id)
VALUES
    ('Junior Sales Advisor', 50000, 1),
    ('Junior Engineer', 60000, 2),
    ('Junior Marketing Advisor', 40000, 3),
    ('Junior Accounting Advisor', 50000, 4),
    ('Junior IT Technician', 50000, 5),
    ('Senior Sales Advisor', 70000, 1),
    ('Senior Engineer', 85000, 2),
    ('Senior Marketing Advisor', 65000, 3),
    ('Senior Accounting Advisor', 65000, 4),
    ('Senior IT Advisor', 75000, 5);

INSERT INTO employee 
    (first_name , last_name , role_id, manager_id)
VALUES
    ('Kevin', 'Square', 1, null),
    ('Austin', 'Circle', 2, 3),
    ('Kathy', 'Octogon', 3, null),
    ('Amber', 'Rectangle', 4, null),
    ('James', 'Oval', 3, 4),
    ('Kelly', 'Hexagon', 5, 2),
    ('Jasper', 'Triangle', 1, 1),
    ('Angela', 'Kite', 2, 5);