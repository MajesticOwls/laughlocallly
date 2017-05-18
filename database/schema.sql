DROP DATABASE IF EXISTS heroku_46dfd3e3a278e3c;

CREATE DATABASE heroku_46dfd3e3a278e3c;

USE heroku_46dfd3e3a278e3c;

DROP TABLE IF EXISTS audience;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS venueavailability;
DROP TABLE IF EXISTS comedians;
DROP TABLE IF EXISTS hosts;
DROP TABLE IF EXISTS MessageBoard;

CREATE TABLE `audience` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `id_events` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `events` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `id_comedians` INTEGER NOT NULL,
  `date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `id_venues` INTEGER NOT NULL,
  `photo_url` VARCHAR(300),
  `status` VARCHAR(50) NOT NULL,
  `description` VARCHAR(1000) NOT NULL
  PRIMARY KEY (`id`)
);

CREATE TABLE `venues` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `dates_available` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `zipcode` INTEGER(5) NOT NULL,
  `id_hosts` INTEGER NOT NULL,
  `photo_url` VARCHAR(1000),
  `capacity` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `venueavailability` (
  `id` INTEGER NOT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `comedians` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `bio` VARCHAR(10000) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `website` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `twitter` VARCHAR(255) NOT NULL,
  `photo_url` VARCHAR(1000) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,
  `video_url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `hosts` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Messageboard` (
  'id' INTEGER NOT NULL AUTO_INCREMENT,
  'user' VARCHAR(255) NOT NULL,
  'text' VARCHAR(5000) NOT NULL,
  PRIMARY KEY('id')

);
-- FOR SAVING ALL MESSAGES IN MAIN MESSAGE BOARD


-- ALTER TABLE `audience` ADD FOREIGN KEY (id_events) REFERENCES `events` (`id`);
-- ALTER TABLE `events` ADD FOREIGN KEY (id_venues) REFERENCES `venues` (`id`);
-- ALTER TABLE `events` ADD FOREIGN KEY (id_comedians) REFERENCES `comedians` (`id`);
-- ALTER TABLE `venues` ADD FOREIGN KEY (id_hosts) REFERENCES `hosts` (`id`);


-- Step 1) Load file to mysql from inside directory
--   mysql -u root < database/schema.sql
-- Step 2) Open mysql (no password for root)
--   mysql -u root -p
