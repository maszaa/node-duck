/*
Edit sightings
Handlers for GET and POST '/sighting/<id>/edit' urls
*/

module.exports = function(app, models) {
  app.get('/sighting/:id/edit', function(req, res) {
    models.Sighting
      .query()
      .where('id', req.params.id)
      .then(function(sightings) {
        // Fetching one sighting should return only one sighting
        if (sightings.length === 1) {
          // Fetch all species so that the species of the sighting can be selected from the ones that are in the database
          models.Species
            .query()
            .then(function(species) {
              res.render('edit', {title: 'DucketiDuck', pageTitle: 'Edit sighting', message: 'All fields are mandatory', sighting: sightings[0], species: species, messages: req.flash('edit')});
            })
            // Species table is probably dropped or missing
            .catch(function(error) {
              req.flash('edit', 'Database is broken, come back later');
              res.redirect('/sightings');
            });
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
      // Triggers Objection validation which is based on the Sighting table schema
      // Throws an error if user has submitted illegal values
      .update({species: req.body.species, description: req.body.description, datetime: req.body.datetime, count: req.body.count})
      .where('id', req.body.id)
      .then(function(updatedCount) {
        // Updating one sighting should update only one sighting
        if (updatedCount === 1) {
          req.flash('edit', 'Sighting with id ' + req.body.id + ' was updated');
          res.redirect('/sightings');
        }
        else {
          throw 'Sighting with id ' + req.body.id + ' was not found or could not be updated';
        }
      })
      // User submitted illegal values, redirect to edit page so that the data of the sighting is loaded again
      .catch(function(error) {
        req.flash('edit', 'Illegal values, check all fields again');
        res.redirect('/sighting/' + req.params.id + '/edit');
      });
  });
}
