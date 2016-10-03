module.exports = function(app) {

    app.get("/result", function (req, response) {
        var db = require('../database');
        // Lectura de todas las tareas de la BD
        db.readFromDatabaseAll(function (rows) {
            if (typeof(rows) == "object" && rows != null && !rows.hasOwnProperty('error')) {

                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(rows));
                response.end();
            } else if (rows.hasOwnProperty('error')) {
                // error case
                response.writeHead(500, {"Content-Type": "text/html"});
                response.write("Fatal error");
                response.end();
            } else {
                // error case
                response.writeHead(500, {"Content-Type": "text/html"});
                response.write("Fatal error");
                response.end();
            }
        });
    });

    // process the login form
    app.post('/result', function(req, response){
        var db = require('../database');
        //var util = require('util');
        //util.inspect(req);
        db.saveToDatabase(req.body, function(err){
            if (!err) {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write("Ok! Successfully registered");
                response.end();
            } else {
                // error case
                response.writeHead(500, {"Content-Type": "text/html"});
                response.write("Fatal error");
                response.end();
            }
        });
    });


};
