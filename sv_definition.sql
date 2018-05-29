-- CS 361 Group 23
-- mysqldump --databases --user=anmolbirmmrcode c9  > sv_export.sql
-- command above to export current database into a file

SET FOREIGN_KEY_CHECKS =0;
DROP table if exists `professionals`;
DROP table if exists `students`;
DROP table if exists `opportunities`;
DROP table if exists `applications`;
SET FOREIGN_KEY_CHECKS =1;

-- Create students table
CREATE TABLE students (
    id int(11) NOT NULL AUTO_INCREMENT,
    fname varchar(255) NOT NULL,
    lname varchar(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE(fname, lname)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create professionals table
CREATE TABLE professionals (
    id int(11) NOT NULL AUTO_INCREMENT,
    fname varchar(255) NOT NULL,
    lname varchar(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE(fname, lname)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create opportunities table
CREATE TABLE opportunities (
    id int(11) NOT NULL AUTO_INCREMENT,
    pid int(11) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY(pid) REFERENCES professionals(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create applications table
CREATE TABLE applications (
    oid int(11) NOT NULL, 
    sid int(11) NOT NULL, 
    FOREIGN KEY(oid) REFERENCES opportunities(id) ON DELETE CASCADE,
    FOREIGN KEY(sid) REFERENCES students(id) ON DELETE CASCADE,
    PRIMARY KEY (oid, sid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

