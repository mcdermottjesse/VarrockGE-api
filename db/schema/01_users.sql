-- within vagrant:
-- CREATE DATABASE final_project;
-- \c final_project

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255),
  password VARCHAR(255),
  balance INTEGER,
  isAdmin BOOLEAN
);