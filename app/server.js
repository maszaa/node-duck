/*
Main file:
Require needed components and other files
Setup and initialize components
Running the server
*/

const app = require('express')();
const express = require("express");
const bodyParser = require('body-parser');
const Objection = require('objection');
const Knex = require('knex');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const flash = require('connect-flash');

// Connect flash for messaging, needs sessions
app.use(flash());
app.use(session({
  secret: 'Ducks go swimming',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Initialize Objection
var Model = Objection.Model;
var knex = Knex({
    client: 'postgres',
    connection: {
        host: '127.0.0.1',
        port: '5432',
        database: 'ducketiduckdb',
        user: 'nodeduck',
        password: 'duckpassu',
    }
});
Model.knex(knex);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.pretty = true;
app.set('json spaces', 4);

// For static files (CSS etc.)
app.use(express.static('static'));

// Require models based on db tables
const models = require('./models.js')(Model);

// Require all the route files in /routes
const routePath = path.join(__dirname, 'routes');
fs.readdirSync(routePath).forEach(function(file) {
  if (file.split('.').pop() === "js") {
    require(path.join(routePath, file))(app, models);
  }
});

const port = process.env.PORT ? process.env.PORT : 8081;
const server = app.listen(port, () => {
    console.log("Server listening  port %s", port);
});
