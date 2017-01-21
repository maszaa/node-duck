module.exports = function(app, models) {
  app.get('/sighting/:id', function(req, res) {
    models.Sighting
      .query()
      .where('id', parseInt(req.params.id))
      .then(function(sightings) {
        if (sightings.length === 1) {
          res.render('sighting', {title: 'DucketiDuck', pageTitle: 'Sighting', message: 'Explore, edit or remove sighting', sighting: sightings[0]});
        }
        else {
          throw "Not found";
        }
      })
      .catch(function(error) {
        res.render('sighting', {title: 'DucketiDuck', pageTitle: 'Sighting', message: 'No sighting with given id!'});
      });
  });
}
