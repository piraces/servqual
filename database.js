// Modo estricto
'use strict';

// Módulos importados
var mongoose = require('mongoose'),
    Result = require("./models/result.js").Result;;

// URL de conexión
function readFromDatabaseAll(callback) {
    Result.find({}).exec(function (err, documents) {
        var globalAverage = {
            tangible: 0,
            reliability: 0,
            responsiveness: 0,
            assurance: 0,
            empathy: 0,
            total: 0,
            average: 0
        };
        if (err){
            callback({'error': 500, 'errorDetail': 'Error en la recuperación de resultados.'});
        } else if(documents.length == 0) {
            callback(globalAverage);
        } else {
            var iterations = 0;
            documents.forEach(function(document){
                globalAverage.tangible += document.tangible;
                globalAverage.reliability += document.reliability;
                globalAverage.responsiveness += document.responsiveness;
                globalAverage.assurance += document.assurance;
                globalAverage.empathy += document.empathy;
                globalAverage.total += document.total;
                globalAverage.average += document.average;

                iterations += 1;
            });
            globalAverage.tangible /= iterations;
            globalAverage.reliability /= iterations;
            globalAverage.responsiveness /= iterations;
            globalAverage.assurance /= iterations;
            globalAverage.empathy /= iterations;
            globalAverage.total /= iterations;
            globalAverage.average /= iterations;
            callback(globalAverage);
        }
    });
}

// URL de conexión
function saveToDatabase(results, callback) {
    var res = new Result({tangible: results.tangible, reliability: results.reliability, responsiveness:
        results.responsiveness, assurance: results.assurance, empathy: results.empathy, total: results.total,
        average: results.average});
    res.save(function(err) {
        if (err){
            callback({'error': 500, 'errorDetail': 'Error en la recuperación de resultados.'});
        } else {
            callback();
        }
    });
}


// Funciones exportadas para ser usadas externamente
exports.readFromDatabaseAll = readFromDatabaseAll;
exports.saveToDatabase = saveToDatabase;