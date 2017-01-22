/*
Sighting reports
Handler for GET '/reports*' urls
*/

module.exports = function(app, models) {
  app.get('/reports', function(req, res) {

    // Fetch all sightings which count is more than count
    if (req.query.count !== undefined) {
      models.Sighting
        .query()
        .where('count', '>', req.query.count)
        .then(function(sightings) {
          res.status(200).json(sightings);
        })
        // A value that couldn't be parsed to int as the value of <count> was given
        .catch(function(error) {
          res.status(403).json({error: 'Illegal value of <count>'});
        });
    }

    // Fetch all sightings of species from timeStarting to timeEnding
    else if (req.query.species !== undefined && req.query.timeStarting !== undefined && req.query.timeEnding !== undefined) {
      models.Sighting
        .query()
        // Working of this clause can depend on the database that is used
        // For PostgreSQL the timestamp (type of 'datetime') is in form 'YYYY-MM-DD HR:MN:SS' and so are timeStarting and timeEnding
        .whereBetween('datetime', [req.query.timeStarting, req.query.timeEnding])
        .andWhere('species', req.query.species)
        .then(function(sightings) {
          res.status(200).json(sightings);
        })
        // Either unvalid species name or illegal <timeStarting> or <timeEnding> values were given
        .catch(function(error) {
          res.status(403).json({error: 'Illegal <species>, <timeStarting> or <timeEnding> value'});
        });
    }

    // Fetch all sightings of a specific month and year
    else if(req.query.yearMonth !== undefined) {
      models.Sighting
        .query()
        // Working of this clause can depend on the database that is used
        // For PostgreSQL there is a to_char(value, format) function
        // and the timestamp (type of 'datetime') is in form 'YYYY-MM-DD HR:MN:SS' so yeard and month can be extracted like this
        .whereRaw("to_char(datetime, 'YYYY-MM') = ?", [req.query.yearMonth])
        .then(function(sightings) {
          res.status(200).json(sightings);
        })
        // Illegal value of <yyyy-mm> was given
        .catch(function(error) {
          res.status(403).json({error: 'Illegal <yyyy-mm> value'});
        });
    }

    // Reports weren't requested so render the instructions page how to request them
    else {
      var message = "Query sighting reports with the given parameters below.\nReturn values are in JSON format.\ncount and yearMonth are used separately and species, timeStarting and timeEnding together.\nUsage '/reports/?<parameter>=<value>(&<parameter>=<value>)'";
      var reports = [ {
                        parameter: 'count',
                        value: '<number>',
                        description: 'All sightings with count >= <number>',
                      },
                      {
                        parameter: 'yearMonth',
                        value: '<yyyy-mm>',
                        description: 'All sightings of <mm> (month) of <yyyy> (year)',
                      },
                      {
                        parameter: 'species',
                        value: 'canvasback, gadwall, lesser scaup, mallard or redhead',
                        description: 'Name of species',
                      },
                      {
                        parameter: 'timeStarting',
                        value: '<yyyy-mm-dd>+<hr:mn:ss>',
                        description: 'All sightings of species starting from dd.mm.yyyy hr:mn:ss (day.month.year hours:minutes:seconds)',
                      },
                      {
                        parameter: 'timeEnding',
                        value: '<yyyy-mm-dd>+<hr:mn:ss>',
                        description: 'All sightings of species starting from dd.mm.yyyy hr:mn:ss (day.month.year hours:minutes:seconds)'
                      },
                    ];
      res.render('reports', {title: 'DucketiDuck', pageTitle: 'Sighting reports', message: message, reports: reports});
    }
  });
}
