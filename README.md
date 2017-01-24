# Nodeduck

Homework for Summer@Vincit 2017

## Requirements

Node.js, npm, Git and PostgreSQL required.

Works at least with Node.js version v6.94 and npm 3.10.10.

## Installation

```
$ git clone https://github.com/maszaa/nodeduck.git
$ cd nodeduck
```

Assuming you have PostgreSQL installed, server running and have permissions to create roles and databases. Open `psql` terminal and type

```
postgres=# CREATE ROLE nodeduck WITH LOGIN PASSWORD 'duckpassu';
postgres=# CREATE DATABASE ducketiduckdb WITH OWNER nodeduck;
```
Logout from psql and perform
```
psql nodeduck -h 127.0.0.1 -d ducketiduckdb
Password for user nodeduck: duckpassu
ducketiduckdb=> \ir dbInit.sql
```
where `postgres` is the name of the default database.

Install npm packages:

```
$ cd app
$ npm install
```

## Running

To start the server run

```
$ npm start
```

or if you want to run server in some other port than default 8081

```
$ PORT=<port> node server.js
```

where you should replace `<port>` with wanted port number i.e. 3000.

## Usage

*`/species` lists all available duck species
*`/sightings` lists all the sightings made
*`/sighting/new` provides a form to add new sighting
*`/sighting/<id>` shows information of sighting with id `<id>`
*`/sighting/<id>/edit` provides a form to edit sighting with id `<id>`
*`/sighting/<id>/delete` provides a chance to delete sighting with id `<id>`
*`/reports` tells which kind of reports can be requested
