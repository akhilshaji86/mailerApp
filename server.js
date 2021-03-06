var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var app = express();
// API file for interacting with MongoDB
var api = require('./app');
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
// API location
app.use('/api', api);
// // Send all other requests to the Angular app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
// });
//Set Port
var port = process.env.PORT || '3000';
app.set('port', port);
var server = http.createServer(app);
server.listen(port, function () { return console.log("Running on localhost:" + port); });
