var express = require('express'),
    config = require('./config/config'),
    glob = require('glob'),
    mongoose = require('mongoose');
var server_port = process.env.PORT || 5160;

mongoose.connect('mongodb://localhost/sweetproject');
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});


var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
    require(model);
});
var app = express();

require('./config/express')(app,config);


app.listen(server_port, function () {
    console.log('Express server listening on port ' + server_port);
});





