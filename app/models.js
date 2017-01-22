/*
Initialize Species and Sighting models based on the tables in the db
*/

module.exports = function(Model) {
  function Species() {
    Model.apply(this, arguments);
  }

  Species.tableName = 'species';
  Model.extend(Species);

  function Sighting() {
    Model.apply(this, arguments);
  }

  Sighting.tableName = 'sighting';
  Model.extend(Sighting);

  return {Species: Species, Sighting: Sighting};
}
