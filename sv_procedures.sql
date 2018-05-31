-- CS 361 Group 23
-- Defines procedures to interact with SkillVenture Database

DROP PROCEDURE IF EXISTS newUser;
DROP PROCEDURE IF EXISTS getStudents;
DROP PROCEDURE IF EXISTS getStudent;
DROP PROCEDURE IF EXISTS newStudent;
DROP PROCEDURE IF EXISTS getProfessionals;
DROP PROCEDURE IF EXISTS getProfessional;
DROP PROCEDURE IF EXISTS newProfessional;


-- *********************  Procedures *********************************

delimiter //

-- creates a new user
-- u is the user, p is the password, e is the email
-- DON'T CALL This procedure it is a helper procedure for newStudent and 
-- newProfessional
CREATE PROCEDURE newUser(IN u varchar(255), IN p int(11), IN e varchar(255))
BEGIN
    INSERT INTO users(username, password, email)
    VALUES (u, p, e);
END;
//

-- get all students
CREATE PROCEDURE getStudents () 
BEGIN 
    SELECT *
    FROM students s
    LEFT JOIN users u ON s.uid = u.id; 
END;
//

-- get student by first and last name
CREATE PROCEDURE getStudent (IN f varchar(255), IN l varchar(255))
BEGIN 
    SELECT * 
    FROM students s
    LEFT JOIN users u ON s.uid = u.id
    WHERE fname= f AND lname = l;
END;
//

-- create a new student
-- u is username, p is password, e is the email, f is the first name, 
-- l is the last name, s is the school name, a is the age, and g is the grade
CREATE PROCEDURE newStudent(IN u varchar(255), IN p int(11), IN e varchar(255),
    IN f varchar(255), IN l varchar(255), s varchar(255), a int(11), g int(11))
BEGIN
    DECLARE user int(11);
    call newUser(u, p, e);
    SET user = (SELECT id FROM users WHERE username = u);
    INSERT INTO students(uid, fname, lname, sname, age, grade) 
    VALUES (user, f, l, s, a, g);
END;
//

-- get all professionals
CREATE PROCEDURE getProfessionals () 
BEGIN 
    SELECT *
    FROM professionals p
    LEFT JOIN users u ON p.uid = u.id; 
END;
//

-- get professional by first and last name
CREATE PROCEDURE getProfessional (IN f varchar(255), IN l varchar(255))
BEGIN 
    SELECT * 
    FROM professionals p
    LEFT JOIN users u ON p.uid = u.id
    WHERE fname= f AND lname = l;
END;
//

-- create a new professional
-- u is the username, p is the password, e is the email, f is first name, 
-- l is last name, c is the company name, and v is verified boolean
CREATE PROCEDURE newProfessional(IN u varchar(255), IN p int(11), 
    IN e varchar(255), IN f varchar(255), IN l varchar(255), c varchar(255), 
    v bool)
BEGIN
    DECLARE user int(11);
    call newUser(u, p, e);
    SET user = (SELECT id FROM users WHERE username = u);
    INSERT INTO professionals(uid, fname, lname, cname, verified) 
    VALUES (user, f, l, c, v);
END;
//


-- get opportunities for search
-- s is the search keyword
CREATE PROCEDURE getOpportunities (IN s varchar(255))
BEGIN
    SELECT title
    FROM opportunities
    WHERE title LIKE CONCAT('%', s, '%');
END;
//


delimiter ;