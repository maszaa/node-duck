module.exports = function(app, models) {
  app.get('/sighting/new', function(req, res, next) {
    models.Species
      .query()
      .orderBy('name')
      .then(function(species) {
        res.render('new', {title: 'DucketiDuck', pageTitle: 'Add new sighting', message: 'All fields are mandatory', species: species, messages: {}, formData: {}});
      })
  });

  app.post('/sightings', function(req, res, next) {
    models.Sighting
      .query()
      .insert({species: req.body.species, description: req.body.description, datetime: req.body.datetime, count: req.body.count})
      .then(function(sighting) {
        req.flash('add', 'New sighting added');
        res.redirect('/sightings');
      })
      .catch(function(error) {
        req.flash('add', 'Illegal values, check all fields again');
        models.Species
          .query()
          .then(function(species) {
            res.render('new', {title: 'DucketiDuck', pageTitle: 'Add new sighting', message: 'All fields are mandatory', formData: req.body, species: species, messages: req.flash('add')})
          })
      });
  });
}
