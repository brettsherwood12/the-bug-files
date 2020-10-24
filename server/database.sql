/* ran these on command line to instatiate db, not used by app, recorded to instatiate add'l db's when needed */

CREATE DATABASE bug-tracker;

CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(25), passwordHash VARCHAR(255));

CREATE TABLE projects(id SERIAL PRIMARY KEY, name VARCHAR(25), description VARCHAR(255));

CREATE TABLE comments(id SERIAL PRIMARY KEY, bugId FOREIGN KEY REFERENCES bugs(id), description VARCHAR(255));

CREATE TABLE bugs(
  id SERIAL PRIMARY KEY, 
  projectId FOREIGN KEY REFERENCES projects(id), 
  owner FOREIGN KEY REFERENCES USER(id), 
  status ENUM("To Squash", "Squishing", "Squashed") DEFAULT "To Squash", 
  description VARCHAR(255),
  comments FOREIGN KEY REFERENCES comments(id)
);

