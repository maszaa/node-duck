module.exports = function(app, models) {
  app.get('/species/', function(req, res, next) {
    models.Species
      .query()
      .then(function(species) {
        res.render('species', {title: "DucketiDuck", pageTitle: "Duck species", message: "List of duck species available", species: species});
      });
  });
}
