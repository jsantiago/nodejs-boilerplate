#!/usr/bin/env node

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');

var path = require('path');
var cons = require('consolidate');
var swig = require('swig');

var config = require('./config.json');
var info = require('./package.json');

// -----------------------------------------------------------------------------
// mongo
// -----------------------------------------------------------------------------
var UserProfile = require('./models/UserProfile')(config.mongo.uri);

// -----------------------------------------------------------------------------
// Passport
// -----------------------------------------------------------------------------
var passport = require('./passport')(config, UserProfile);

// -----------------------------------------------------------------------------
// Create the app
// -----------------------------------------------------------------------------
var app = express();
var router = express.Router();
var env = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || config.port);

// assign the swig engine to .html files
app.engine('html', cons.swig);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// middleware
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: config.session.secret }));
app.use(logger('dev'));
app.use(methodOverride());

// Add Passport
app.use(passport.initialize());
app.use(passport.session());

if (env === 'development') {
    app.use(errorHandler());
}

// -----------------------------------------------------------------------------
// Routes
// -----------------------------------------------------------------------------
app.get('/', require('./controllers/index')(info));
app.get('/login', require('./controllers/login')(info));
app.get('/logout', require('./controllers/logout'));
require('./controllers/auth')(app, config, passport);

// -----------------------------------------------------------------------------
// Start it up!
// -----------------------------------------------------------------------------
app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
