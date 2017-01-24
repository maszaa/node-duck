/*
List sightings
Handler for GET '/sightings' url
*/

module.exports = function(app, models) {
  app.get('/sightings/', function(req, res) {
    models.Sighting
      .query()
      .orderBy('datetime', 'desc')
      .then(function(sightings) {
        res.render('sightings', {title: 'DucketiDuck', pageTitle: 'Duck sightings', message: 'List of all duck sightings. You can edit or delete a sighting by clicking Explore next to it.', sightings: sightings, messages: req.flash()});
      })
      // Sighting table is probably dropped or missing
      .catch(function(error) {
        req.flash('edit', 'Database is broken, come back later');
        res.render('sightings', {title: 'DucketiDuck', pageTitle: 'Duck sightings', message: 'List of all duck sightings', messages: req.flash()});
      });
  });
}
