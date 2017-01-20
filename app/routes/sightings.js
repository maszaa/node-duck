module.exports = function(app, models) {
  app.get('/sightings/', function(req, res) {
    models.Sighting
      .query()
      .orderBy('dateTime', 'desc')
      .then(function(sightings) {
        res.render('sightings', {title: "DucketiDuck", pageTitle: "Duck sightings", message: "List of all duck sightings", sightings: sightings});
      });
  });
}
