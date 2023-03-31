DROP database if EXISTS ingenius23;
CREATE database ingenius23; 
use ingenius23 
DROP USER if EXISTS 'ingeniususer'@'localhost';
CREATE USER 'ingeniususer'@'localhost' IDENTIFIED BY 'pass1234';
GRANT ALL  ON *.*TO'ingeniususer'@'localhost';
