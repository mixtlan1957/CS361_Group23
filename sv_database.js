/*
 * Author: Anmolbir Mann
 * Description: Module for querying SkillVenture database
 */
 
// module functions
module.exports.setMySQL = setMySQL;
module.exports.callProcedure = callProcedure;

// private module variables

var mysql; // mysql module to use

/*
 * imports MYSQL module to use
 */
function setMySQL(input)
{
  mysql = input;
}

/*
 * Calls the inputed procedure with the given input
 * complete is the callback after query is complete
 */
function callProcedure(procedure, input, complete)
{
  var query = 'call ' + procedure;
  if (input != null) // build query string with ? for input parameters
  {
    query +=  '(';
    for (var i = 0; i < input.length - 1; ++i)
    {
      query += '?, ';
    }
    query += '?)'; // last input
  }
  // console.log('Procedure: ' + query);
  // console.log('Input: ' + input);
  mysql.pool.query(query, input, doQuery);
  function doQuery(err, rows, fields)
  {
    complete(rows[0], err);
  }
}

























