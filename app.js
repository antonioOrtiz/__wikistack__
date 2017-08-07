'use strict';

var express = require('express');
var morgan = require('morgan');

var nunjucks = require('nunjucks');

var app = express();
var path = require('path');

var bodyParser = require('body-parser');
var routes = require('./routes');

var models = require('./models');


app.set('view engine', 'html');
app.engine('html', nunjucks.render); // use nunjucks
nunjucks.configure('views', { noCache: true }); // point to templates

app.use(function(req, res, next) {
    console.log(req.method, req.path)
    next(); // or send a response, otherwise you get stuck
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

console.log('Before hitting our routes!');


app.get('/', function(req, res) {
    console.log('At "/"');
    res.send('Hello!')
});

app.use('/', routes);


models.db.sync({force: true})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
