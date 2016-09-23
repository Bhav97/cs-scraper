var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3400;

app.use(bodyParser.json());

//routes
require('./v1/routes.js')(app);

console.log('listening on ' + port);
app.listen(port);
