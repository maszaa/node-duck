/*
Add new sightings
Handlers for GET '/sighting/new'
         and POST '/sightings' urls
*/

module.exports = function(app, models) {
  app.get('/sighting/new', function(req, res) {
    models.Species
      .query()
      .orderBy('name')
      .then(function(species) {
        res.render('new', {title: 'DucketiDuck', pageTitle: 'Add new sighting', message: 'All fields are mandatory', species: species, messages: {}, formData: {}});
      })
      // Species table is probably dropped or missing
      .catch(function(error) {
        req.flash('edit', 'Database is broken, come back later');
        res.redirect('/sightings');
      });
  });

  app.post('/sightings', function(req, res) {
    models.Sighting
      .query()
      // Triggers Objection validation which is based on the Sighting table schema
      // Throws an error if user has submitted illegal values
      .insert({species: req.body.species, description: req.body.description, datetime: req.body.datetime, count: req.body.count})
      .then(function(sighting) {
        req.flash('add', 'New sighting added');
        res.redirect('/sightings');
      })
      .catch(function(error) {
        req.flash('add', 'Illegal values, check all fields again');
        // Re-query species so that the values the user submitted can be returned to the form on the add page
        models.Species
          .query()
          .then(function(species) {
            res.render('new', {title: 'DucketiDuck', pageTitle: 'Add new sighting', message: 'All fields are mandatory', formData: req.body, species: species, messages: req.flash('add')})
          })
          // Species table is probably dropped or missing
          .catch(function(error) {
            req.flash('edit', 'Database is broken, come back later');
            res.redirect('/sightings');
          });
      });
  });
}
