var methods = {
  
  addUser: function(user, res, mysql, context, complete){
    var sqlQuery = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
    user.password = parseInt(user.password);
    if(isNaN(user.password)){
      user.password = 0;
    }
    var inserts = [user.username, user.password, user.email];
    mysql.pool.query(sqlQuery, inserts,
      function(error, results, fields){
        if(error){
          console.log(error);
          return;
        }
        complete();
      });
  },
  // works when I hand type into mysql... keeps returning undefined
  getUserId: function(username, res, mysql, context){
    var sqlQuery = "SELECT id FROM users WHERE username = ?";
    console.log(sqlQuery + username);
    var inserts = [username];
    mysql.pool.query(sqlQuery, inserts,
      function(error, results, fields){
        if(error){
          console.log(error);
          return;
        }
        context.uid = results[0];
      });
  },

  addStudent: function(user, res, mysql, context, complete){
    // addUser
    console.log('INSERTING: ' + user);
    var sqlQuery = "INSERT INTO students (uid, fname, lname, sname, age, grade) VALUES (?, ?, ?, ?, ?, ?)";
    var inserts = [user.uid, user.fname, user.lname, user.sname, user.age, 
                   user.grade];
    mysql.pool.query(sqlQuery, inserts, 
      function(error, results, fields){
        if(error){
          console.log(error);
          return;
        }
        complete();
      });
  },

  addProfessional: function(user, res, mysql, context, complete){
    // addUser
    complete();
  }

};

exports.data = methods;