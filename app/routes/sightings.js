module.exports = function(app, models) {
  app.get('/sightings/', function(req, res, next) {
    models.Sighting
      .query()
      .orderBy('datetime', 'desc')
      .then(function(sightings) {
        res.render('sightings', {title: "DucketiDuck", pageTitle: "Duck sightings", message: "List of all duck sightings", sightings: sightings, messages: req.flash()});
      });
  });
}
