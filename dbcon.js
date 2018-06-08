var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_francomm',
  password        : '7863',
  database        : 'cs361_francomm'
});

module.exports.pool = pool;