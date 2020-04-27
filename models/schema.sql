
DROP DATABASE IF EXISTS bandwagon_db;
CREATE DATABASE bandwagon_db;

CREATE TABLE `bandwagon_db`.`tbl_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `city_of_interest` VARCHAR(45) NOT NULL,
  `fav_artist` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE tbl_interests (
  user_id INT ,
  event_id INT,
  PRIMARY KEY (user_id, event_id),
  CONSTRAINT FK_User FOREIGN KEY (user_id)
  REFERENCES tbl_users(id)
); 