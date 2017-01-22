/*
List species
Handler for GET '/species' url
*/

module.exports = function(app, models) {
  app.get('/species/', function(req, res, next) {
    models.Species
      .query()
      .then(function(species) {
        res.render('species', {title: "DucketiDuck", pageTitle: "Duck species", message: "List of duck species available", species: species, messages: {}});
      })
      // Species table is probably dropped or missing
      .catch(function(error) {
        req.flash('edit', 'Database is broken, come back later');
        res.render('species', {title: "DucketiDuck", pageTitle: "Duck species", message: "List of duck species available", messages: req.flash()});
      });
  });
}
