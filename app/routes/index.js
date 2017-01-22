/*
Home page
Handler for GET '/' url
*/

module.exports = function(app, models) {
  app.get('/', function(req, res, next) {
    res.render('index', {title: "DucketiDuck", pageTitle: "Welcome to DucketiDuck!", message: "See, edit, add and remove duck sightings!"});
  });
}
