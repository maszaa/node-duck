/*
Sighting reports
Handler for GET '/reports*' urls
*/

module.exports = function(app, models) {
  app.get('/reports', function(req, res) {
    const parameters = req.query;

    // Fetch all sightings which count is more than count
    if (parameters.count !== undefined) {
      models.Sighting
        .query()
        .where('count', '>', parameters.count)
        .then(function(sightings) {
          res.status(200).json(sightings);
        })
        // A value that couldn't be parsed to int as the value of <count> was given
        .catch(function(error) {
          res.status(403).json({error: 'Illegal value of <count>'});
        });
    }

    // Fetch all sightings of species from timeStarting to timeEnding
    else if (parameters.species !== undefined && parameters.timeStarting !== undefined && parameters.timeEnding !== undefined) {
      models.Sighting
        .query()
        // Working of this clause can depend on the database that is used
        // For PostgreSQL the timestamp (type of 'datetime') is returned in form 'YYYY-MM-DD hh:mm:ss', timeStarting and timeEnding are in same format
        .whereBetween('datetime', [parameters.timeStarting, parameters.timeEnding])
        .andWhere('species', parameters.species)
        .then(function(sightings) {
          res.status(200).json(sightings);
        })
        // Either unvalid species name or illegal <timeStarting> or <timeEnding> values were given
        .catch(function(error) {
          res.status(403).json({error: 'Illegal <species>, <timeStarting> or <timeEnding> value'});
        });
    }

    // Fetch all sightings of a specific month and year
    else if(parameters.yearMonth !== undefined) {
      models.Sighting
        .query()
        // Working of this clause can depend on the database that is used
        // PostgreSQL has a to_char(timestamp, format) function
        // and the timestamp (type of 'datetime') is returned in form 'YYYY-MM-DD hh:mm:ss', so year and month can be extracted like this
        .whereRaw("to_char(datetime, 'YYYY-MM') = ?", [parameters.yearMonth])
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
                        value: '<YYYY-MM>',
                        description: 'All sightings of <mm> (month) of <yyyy> (year)',
                      },
                      {
                        parameter: 'species',
                        value: 'canvasback, gadwall, lesser scaup, mallard or redhead',
                        description: 'Name of species',
                      },
                      {
                        parameter: 'timeStarting',
                        value: '<YYYY-MM-DD>+<hh:mm:ss>',
                        description: 'All sightings of species starting from YYYY-MM-DD hh:mm:ss (year-month-day hours:minutes:seconds)',
                      },
                      {
                        parameter: 'timeEnding',
                        value: '<YYYY-MM-DD>+<hh:mm:ss>',
                        description: 'All sightings of species starting from YYYY-MM-DD hh:mm:ss (year-month-day hours:minutes:seconds)'
                      },
                    ];
      res.render('reports', {title: 'DucketiDuck', pageTitle: 'Sighting reports', message: message, reports: reports});
    }
  });
}
