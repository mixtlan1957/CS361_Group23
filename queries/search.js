// UNUSED CODE
var methods = {
    search: function(sql, res, mysql, context, complete){
        mysql.poolquery(sql, function(error, results, fields){
            if(error)
            {
                console.log(error);
                res.end();
            }
            context.opportunities = results;
            complete();
        });
    }
};