CREATE TABLE Species(
  name        VARCHAR(64) PRIMARY KEY
);

CREATE TABLE Sighting(
  id          SERIAL PRIMARY KEY,
  dateTime    DATETIME NOT NULL,
  description TEXT,
  species     REFERENCES Species(name) NOT NULL,
  count       INTEGER NOT NULL,
  CHECK(count > 0)
);

INSERT INTO Species VALUES('mallard');
INSERT INTO Species VALUES('redhead');
INSERT INTO Species VALUES('gadwall');
INSERT INTO Species VALUES('canvasback');
INSERT INTO Species VALUES('lesser scaup');

INSERT INTO Sighting(species, description, dateTime, count)
  VALUES('gadwall', 'All your ducks are belong to us', '2016-10-01T01:01:00Z', 1);
INSERT INTO Sighting(species, description, dateTime, count)
  VALUES('lesser scaup', 'This is awesome', '2016-12-13T12:05:00Z', 5);
INSERT INTO Sighting(species, description, dateTime, count)
  VALUES('canvasback', '...', '2016-11-30T23:59:00Z', 2);
INSERT INTO Sighting(species, description, dateTime, count)
  VALUES('mallard', 'Getting tired', '2016-11-29T00:00:00Z', 18);
INSERT INTO Sighting(species, description, dateTime, count)
  VALUES('redhead', 'I think this one is called Alfred J.', '2016-11-29T10:00:01Z', 1);
INSERT INTO Sighting(species, description, dateTime, count)
  VALUES('redhead',  'If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.', '2016-12-01T13:59:00Z', 1);
INSERT INTO Sighting(species, description, dateTime, count)
  VALUES('mallard', 'Too many ducks to be counted', '2016-12-12T12:12:12Z', 100);
INSERT INTO Sighting(species, description, dateTime, count)
  VALUES( 'canvasback', 'KWAAK!!!1', '2016-12-11T01:01:00Z', 5);
