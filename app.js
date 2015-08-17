'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

var TIMELOGOUT = 2 * 60 * 1000; //ms

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser('Quiz 2015 smorcuend'));

app.use(session());

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinamicos:
app.use(function(req, res, next) {

    // guardar path en session.redir para despues de login
    if (!req.path.match(/\/login|\/logout/)) {
        req.session.redir = req.path;
    }

    // Hacer visible req.session en las vistas
    res.locals.session = req.session;

    next();
});

//n middleware de auto-logout
app.use(function(req, res, next) {
    var currentDate = (new Date()).getTime();
    if (req.session.user) { // si estamos en una sesion
        if (!req.session.timestamp) { //primera vez se pone la marca de tiempo
            req.session.timestamp = currentDate;
        } else {
            if (currentDate - req.session.timestamp > TIMELOGOUT) {
                delete req.session.user; //eliminamos el usuario
                delete req.session.timestamp; //eliminamos la marca de tiempo

                res.status(401);
                res.render('error', {
                    message: "La sesión ha caducado",
                    error: {},
                    errors: []
                });

            } else { //hay actividad se pone nueva marca de tiempo
                req.session.timestamp = currentDate;

            }
        }
    }
    next();
});

//Autologout (módulo 9)
// if (req.session.user) {
//     // Petición autenticada
//     var now = new Date().getTime(),
//         lastInteraction = req.session.lastInteraction;

//     if (lastInteraction && (now - lastInteraction) > TIME_LOGOUT) {
//         // Sesión caducada
//         delete req.session.user;
//         res.status(401);
//         res.render('error', {
//             message: "La sesión ha caducado",
//             error: {},
//             errors: []
//         });
//     } else {
//         req.session.lastInteraction = new Date().getTime();
//         res.locals.session = req.session;
//     }

// }


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});

// EJS helpers
app.locals.capitalize = function(str) {
    str = String(str);
    return str[0].toUpperCase() + str.substr(1, str.length);
};


module.exports = app;
