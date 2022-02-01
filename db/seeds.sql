INSERT INTO department (id, name)
VALUES (1, "Human Resources"),
       (2, "Creative"),
       (3, "Software Engineering"),
       (4, "Marketing"),
       (5, "IT");

INSERT INTO role (id, title, salary, department_id)   
VALUES (1, "UX Designer", 130000.00, 2),
       (2, "Architect", 150000.00, 3),
       (3, "Content Marketing Specialist", 110000.00, 4),
       (4, "Creative Director", 150000.00, 4),
       (5, "Help Desk Support", 70000.00, 5),
       (6, "Recruiter", 115000.00, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Mark", "Thompson", 2, NULL),
       (2, "Stephanie", "Martinez", 4, 4),
       (3, "Evori", "Dawson", 3, 4),
       (4, "Cameron", "Sanchez", 1, 2),
       (5, "Richard", "Smith", 6, 1),
       (6, "Leslie", "Williams", 5, NULL)
       

