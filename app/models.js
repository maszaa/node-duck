module.exports = function(Model) {
  function Species() {
    Model.apply(this, arguments);
  }

  Species.tableName = 'Species';
  Model.extend(Species);

  function Sighting() {
    Model.apply(this, arguments);
  }

  Sighting.tableName = 'Sighting';
  Model.extend(Sighting);

  return {Species: Species, Sighting: Sighting};
}
