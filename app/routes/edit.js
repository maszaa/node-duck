module.exports = function(app, models) {
  app.get('/sighting/:id/edit', function(req, res) {
    models.Sighting
      .query()
      .where('id', req.params.id)
      .then(function(sightings) {
        if (sightings.length === 1) {
          models.Species
            .query()
            .then(function(species) {
              res.render('edit', {title: 'DucketiDuck', pageTitle: 'Edit sighting', message: 'All fields are mandatory', sighting: sightings[0], species: species, messages: req.flash('edit')});
            })
        }
        else {
          throw 'Sighting with id ' + req.params.id + ' was not found';
        }
      })
      .catch(function(error) {
        req.flash('edit', error);
        res.redirect('/sightings');
      });
  });

  app.post('/sighting/:id/edit', function(req, res) {
    models.Sighting
      .query()
      .update({species: req.body.species, description: req.body.description, datetime: req.body.datetime, count: req.body.count})
      .where('id', req.body.id)
      .then(function(updatedCount) {
        if (updatedCount === 1) {
          req.flash('edit', 'Sighting with id ' + req.body.id + ' was updated');
          res.redirect('/sightings');
        }
        else {
          throw 'Sighting with id ' + req.body.id + ' was not found or could not be updated';
        }
      })
      .catch(function(error) {
        req.flash('edit', 'Illegal values, check all fields again');
        res.redirect('/sighting/' + req.params.id + '/edit');
      });
  });
}
