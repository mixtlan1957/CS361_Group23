var methods = {
  
  addUser: function(user, res, mysql, context, complete){
    var sqlQuery = "INSERT INTO users (username, password, email)";
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

  addStudent: function(user, res, mysql, context, complete){
    complete();
  },

  addProfessional: function(user, res, mysql, context, complete){
    
  }

};

exports.data = methods;