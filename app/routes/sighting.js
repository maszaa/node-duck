/*
Explore single sighting
Handler for GET '/sighting/<id>' urls
*/

module.exports = function(app, models) {
  app.get('/sighting/:id', function(req, res) {
    models.Sighting
      .query()
      .where('id', req.params.id)
      .then(function(sightings) {
        // Fetching one sighting should return only one sighting
        if (sightings.length === 1) {
          res.render('sighting', {title: 'DucketiDuck', pageTitle: 'Sighting', message: 'Explore, edit or remove sighting', sighting: sightings[0]});
        }
        else {
          throw 'Sighting with id ' + req.params.id + ' was not found';
        }
      })
      // User queried a sighting that doesn't exist in the database
      .catch(function(error) {
        req.flash('explore', error);
        res.redirect('/sightings');
      });
  });
}
