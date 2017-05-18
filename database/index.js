var mysql = require('mysql');
var Promise = require('bluebird');

var db = mysql.createConnection({
  host     : 'us-cdbr-iron-east-03.cleardb.net',
  user     : 'bce42e5faf12da',
  password : 'b8bbe18e',
  database : 'heroku_46dfd3e3a278e3c'
});

// Will prevent the db from crashing
setInterval(() => {
  db.query('SELECT 1');
}, 5000);

// this will automatically insert tables into mysql when server is run from command line.
var dp = Promise.promisifyAll(db);

dp.connectAsync()
  .then(() => {
  	return dp.queryAsync(`CREATE DATABASE IF NOT EXISTS heroku_46dfd3e3a278e3c`)
  })
  .then(() => {
  	return dp.queryAsync(`USE heroku_46dfd3e3a278e3c`)
  })
  .then(() => {
    return dp.queryAsync(`
      CREATE TABLE IF NOT EXISTS messageboard (
        id INTEGER NOT NULL AUTO_INCREMENT,
        user VARCHAR(255) NOT NULL,
        text VARCHAR(1000) NOT NULL,
        PRIMARY KEY('id')
      )`)
  })
  .then(() => {
  	return dp.queryAsync(`
  		CREATE TABLE IF NOT EXISTS audience (
  		  id INTEGER NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        id_events INTEGER NOT NULL,
        PRIMARY KEY (id)
      );`)
  })
  .then(() => {
  	return dp.queryAsync(`
  		CREATE TABLE IF NOT EXISTS events (
        id INTEGER NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        id_comedians INTEGER,
        date VARCHAR(50),
        start_time VARCHAR(20),
        end_time VARCHAR(20),
        id_venues INTEGER,
        photo_url VARCHAR(300),
        status VARCHAR(50),
        description VARCHAR(1000),
        PRIMARY KEY (id)
      );`)
  })
  .then(() => {
  	return dp.queryAsync(`
  		CREATE TABLE IF NOT EXISTS venues (
        id INTEGER NOT NULL AUTO_INCREMENT,
        dates_availible VARCHAR(255),
        address VARCHAR(255),
			  zipcode VARCHAR(20),
			  id_hosts INTEGER,
			  photo_url VARCHAR(1000),
			  capacity VARCHAR(30),
			  PRIMARY KEY (id)
			);`)
  })
  .then(() => {
  	return dp.queryAsync(`
  		CREATE TABLE IF NOT EXISTS venueavailability (
	      id INTEGER NOT NULL,
			  start_date DATETIME NOT NULL,
			  end_date DATETIME NOT NULL,
			  PRIMARY KEY (id)
		);`)
  })
  .then(() => {
    return dp.queryAsync(`
    	CREATE TABLE IF NOT EXISTS comedians (
			  id INTEGER NOT NULL AUTO_INCREMENT,
			  bio VARCHAR(10000) NOT NULL,
			  name VARCHAR(255) NOT NULL,
			  website VARCHAR(255) NOT NULL,
			  email VARCHAR(255) NOT NULL,
			  phone VARCHAR(255) NOT NULL,
			  twitter VARCHAR(255) NOT NULL,
			  photo_url VARCHAR(1000) NOT NULL,
			  password VARCHAR(255) NOT NULL,
			  salt VARCHAR(255) NOT NULL,
			  video_url VARCHAR(255) NOT NULL,
			  PRIMARY KEY (id)
			);`)
  })
  .then(() => {
  	return dp.queryAsync(`
  		CREATE TABLE IF NOT EXISTS hosts (
			  id INTEGER NOT NULL AUTO_INCREMENT,
			  name VARCHAR(255) NOT NULL,
			  email VARCHAR(255) NOT NULL,
			  phone VARCHAR(255) NOT NULL,
			  PRIMARY KEY (id)
			);`)
  })


module.exports = db;
