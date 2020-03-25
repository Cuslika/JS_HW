var express = require('express');
var app = express();

app.use(express.static('static'));

// Load routing
require('./route/index')(app);

var server = app.listen(3000, function () {
    console.log("Starting PP On: 3000");
});