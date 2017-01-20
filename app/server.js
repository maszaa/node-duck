const app = require('express')();
const express = require("express");
const bodyParser = require('body-parser');
const Objection = require('objection');
const Knex = require('knex');
const path = require('path');
const fs = require('fs');

// Initialize Objection
var Model = Objection.Model;
var knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: '../db.sqlite' // edit filename to suit the name of your sqlite db
  },
  useNullAsDefault: true
});
Model.knex(knex);

// Require models based on db tables
const models = require('./models.js')(Model);

// Require all the route files in /routes
const routePath = path.join(__dirname, 'routes');
fs.readdirSync(routePath).forEach(function(file) {
  if (file.split('.').pop() == "js") {
    require(path.join(routePath, file))(app, models);
  }
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.pretty = true;
app.set('json spaces', 4);

// For static files (CSS etc.)
app.use(express.static('static'));

app.use(bodyParser.json());

const port = process.env.PORT ? process.env.PORT : 8081;
const server = app.listen(port, () => {
    console.log("Server listening  port %s", port);
});
