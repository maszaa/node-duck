module.exports = function(app, models) {
  app.get('/sighting/:id/delete', function(req, res, next) {
    models.Sighting
      .query()
      .where('id', req.params.id)
      .then(function(sightings) {
        if (sightings.length === 1) {
          res.render('delete', {title: 'DucketiDuck', pageTitle: 'Delete sighting',
                                message: 'Are you sure you want to delete a sighting with id ' + req.params.id + '?', sighting: sightings[0]});
        }
        else {
          throw 'Sighting with id ' + req.params.id + ' was not found';
        }
      })
      .catch(function(error) {
        res.render('delete', {title: 'DucketiDuck', pageTitle: 'Delete sighting', message: 'No sighting with given id!'});
      });
  });

  app.post('/sighting/:id/delete', function(req, res, next) {
    models.Sighting
      .query()
      .delete()
      .where('id', req.body.id)
      .then(function(deletedCount) {
        if (deletedCount === 1) {
          req.flash('delete', 'Sighting with id ' + req.body.id + ' was removed');
          res.redirect('/sightings');
        }
        else {
          throw 'Sighting with id ' + req.body.id + ' was not found and not deleted';
        }
      })
      .catch(function(error) {
        req.flash('delete', 'No sighting with id ' + req.body.id + '!');
        res.redirect('/sightings');
      });
  });
}
