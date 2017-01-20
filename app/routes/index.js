module.exports = function(app, models) {
  app.get('/', function(req, res) {
    res.render('index', {title: "DucketiDuck", pageTitle: "Welcome to DucketiDuck!", message: "See, edit, add and remove duck sightings!"});
  });
}
