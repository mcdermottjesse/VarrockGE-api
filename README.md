# VarrockGE Project

VarrockGE is a full stack web application built with React, Express, and PostgresSQL that allows users to buy, sell, and collect video game collectibles. This serves as the front-end repository. The frontend is found at https://github.com/mcdermottjesse/VarrockGE-frontend.

## Project Setup

1. Fork this repository, then clone your fork of this repository.
2. Crate the .env in the root of the Varrock-api directory. The .env file should have the following content:
`DB_HOST=localhost
DB_USER=vagrant
DB_PASS=123
DB_NAME=final_project
DB_PORT=5432`
3. Install all dependencies:
  `npm install`
4. Install the POSTGRESQL database:
  `npm run db:reset`
5. Start the server with:
  `node server.js`
6. Open your web browser and enter the default URL:
  `http://localhost:3000/`
7. When finished, the server can be safely shut down with `control + c`.

## Dependencies

* Node 10.16.1 or above.
* NPM 6.9.0 or above.
* Cors 2.8.5 or above.
* dotenv 8.2.0 or above.
* Express 4.17.1 or above.
* pg 8.5.1 or above.
* pg-native 3.0.0 or above.