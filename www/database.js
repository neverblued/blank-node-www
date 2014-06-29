var mongoose = require('mongoose');
var config = require('./../config');

mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;
