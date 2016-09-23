var express = require('express');

var app = express();
var port = process.env.PORT || 3400;

//routes
require('./v1/routes.js')(app);

console.log('listening on ' + port);
app.listen(port);
