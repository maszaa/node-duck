# Nodeduck

Homework for Summer @Vincit 2017

## Requirements

Node.js, npm, Git and SQLite3 (CLI) required.

Works at least with Node.js version v6.94 and npm 3.10.10.

## Installation

```
$ git clone https://github.com/maszaa/nodeduck.git
$ cd nodeduck
```
Create a SQLite db:
```
$ sqlite3 db.sqlite
```
Initialize the database with predefined tables and values in SQLite CLI:
```
sqlite> .read dbInit.sql
```
Install npm packages:
```
$ cd app
$ npm install
```

## Running

To start server run

```
$ npm start
```

or if you want to run server in some other port than default 8081

```
$ PORT=<port> node server.js
```

where you should replace `<port>` with wanted port number i.e. 3000.

## Usage
