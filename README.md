# Nodeduck

Homework for Summer@Vincit 2017

## Requirements

Node.js, npm, Git and PostgreSQL required.

Works at least with Node.js version v6.9.4/v5.9.0 and npm 3.10.10/3.7.3.

## Installation

```
$ git clone https://github.com/maszaa/nodeduck.git
$ cd nodeduck
```

Assuming you have PostgreSQL installed, server running at port 5432 and have permissions to create roles and databases. Open `psql` terminal and type

```
postgres=# CREATE ROLE nodeduck WITH LOGIN PASSWORD 'duckpassu';
postgres=# CREATE DATABASE ducketiduckdb WITH OWNER nodeduck;
```
Logout from psql and perform
```
psql -U nodeduck -h 127.0.0.1 -d ducketiduckdb
Password for user nodeduck: duckpassu
ducketiduckdb=> \ir dbInit.sql
```
where `postgres` is the name of the default database. `\ir dbInit.sql` creates tables and inserts values to those if you opened the connection to database in the `/node-duck` folder.

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

* `/species` lists all available duck species
* `/sightings` lists all the sightings made
* `/sighting/new` provides a form to add new sighting
* `/sighting/<id>` shows information of sighting with id `<id>`
* `/sighting/<id>/edit` provides a form to edit sighting with id `<id>`
* `/sighting/<id>/delete` provides a chance to delete sighting with id `<id>`
* `/reports` tells which kind of reports can be requested
