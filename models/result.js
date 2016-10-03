// app/models/results.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var resultSchema = mongoose.Schema({
        tangible: Number,
        reliability: Number,
        responsiveness: Number,
        assurance: Number,
        empathy: Number,
        total: Number,
        average: Number
});


// create the model for users and expose it to our app
module.exports = {
        Result: mongoose.model('Result', resultSchema)
};