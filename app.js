const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./routes/index');
//const expressValidator = require('express-validator');


//const brew = require('brew').brew;
const fs = require('fs'); 
const mysql = require('mysql'); 

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(flash());
//app.use(expressValidator());
app.use('/', routes);
app.use('/samochody', routes);
app.use('/klienci', routes);
app.use('/wypozyczenie', routes);
//app.use('/deleteFunction', routes);
module.exports = app;