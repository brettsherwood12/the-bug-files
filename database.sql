/* ran these on command line to instatiate db, not used by app, recorded to instatiate add'l db's when needed */

CREATE DATABASE process.env.DATABASE_NAME;

CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(25), password_hash VARCHAR(100));

CREATE TABLE projects(id SERIAL PRIMARY KEY, user_id INTEGER, name VARCHAR(25), description VARCHAR(255), CONSTRAINT fk_project FOREIGN KEY(user_id) REFERENCES users(id));

CREATE TYPE status_type AS ENUM ('To Do', 'Doing', 'Done');
CREATE TABLE bugs(id SERIAL PRIMARY KEY, project_id INTEGER, status status_type DEFAULT 'To Do', description VARCHAR(255), comments VARCHAR(255)[], CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(id));
