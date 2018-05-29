-- CS 361 Group 23
-- Defines procedures to interact with SkillVenture Database

DROP PROCEDURE IF EXISTS getStudents;
DROP PROCEDURE IF EXISTS getStudent;
DROP PROCEDURE IF EXISTS getProfessionals;
DROP PROCEDURE IF EXISTS getProfessional;



-- *********************  Procedures *********************************

delimiter //

-- get all players
CREATE PROCEDURE getStudents () 
BEGIN 
    SELECT *
    FROM students s; 
END;
//

-- get student by first and last name
CREATE PROCEDURE getStudent (IN f varchar(255), IN l varchar(255))
BEGIN 
    SELECT * FROM students
    WHERE fname= f AND lname = l;
END;
//

-- get all professionals
CREATE PROCEDURE getProfessionals () 
BEGIN 
    SELECT *
    FROM professionals p; 
END;
//

-- get professional by first and last name
CREATE PROCEDURE getProfessional (IN f varchar(255), IN l varchar(255))
BEGIN 
    SELECT * FROM professionals
    WHERE fname= f AND lname = l;
END;
//


delimiter ;