-- CS 361 Group 23
-- mysqldump --databases --user=anmolbirmmrcode c9  > sv_export.sql
-- command above to export current database into a file

SET FOREIGN_KEY_CHECKS =0;
DROP table if exists `users`;
DROP table if exists `professionals`;
DROP table if exists `students`;
DROP table if exists `opportunities`;
DROP table if exists `applications`;
SET FOREIGN_KEY_CHECKS =1;

-- Create users table
CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    password int(11) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE(username)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create students table
-- sname is the school name, uid is the user id
CREATE TABLE students (
    id int(11) NOT NULL AUTO_INCREMENT,
    uid int(11) NOT NULL,
    fname varchar(255) NOT NULL,
    lname varchar(255) NOT NULL,
    sname varchar(255) NULL,
    age int(11) NOT NULL,
    grade int(11) NOT NULL,
    FOREIGN KEY(uid) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (id),
    UNIQUE(uid),
    UNIQUE(fname, lname)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create professionals table
-- cname is company name, uid is the user id
CREATE TABLE professionals (
    id int(11) NOT NULL AUTO_INCREMENT,
    uid int(11) NOT NULL,
    fname varchar(255) NOT NULL,
    lname varchar(255) NOT NULL,
    cname varchar(255) NULL, 
    verified bool NOT NULL,
    FOREIGN KEY(uid) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (id),
    UNIQUE(uid),
    UNIQUE(fname, lname)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create opportunities table
CREATE TABLE opportunities (
    id int(11) NOT NULL AUTO_INCREMENT,
    pid int(11) NOT NULL,
    title varchar(255) NOT NULL,
    location varchar(255) NOT NULL,
    description text NOT NULL,
    postingDate date NOT NULL,
    industry varchar(255) NOT NULL,
    FOREIGN KEY(pid) REFERENCES professionals(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create applications table
CREATE TABLE applications (
    oid int(11) NOT NULL, 
    sid int(11) NOT NULL, 
    status bool NOT NULL, 
    FOREIGN KEY(oid) REFERENCES opportunities(id) ON DELETE CASCADE,
    FOREIGN KEY(sid) REFERENCES students(id) ON DELETE CASCADE,
    PRIMARY KEY (oid, sid)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

