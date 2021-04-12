// load .env data into process.env
require('dotenv').config();

const express = require("express");
const path = require('path');
const morgan = require('morgan');
const cors = require('cors')
const cookieSession = require('cookie-session');
const port = 3006;


const app = express();
app.use(morgan('dev'));
app.post("/login", (req, res) => {
    res.send('POSTING to login');
}) // express
app.get("/", (req, res) => {
    res.send('Hello there');
}) //we can say homepage, serve the index.js and the bundle (index)
app.get("/user/:id", (req, res) => {
    res.send('load a users profile')
}); //load a users profile 


//User/:id/collections

app.get("/user/:id/collections/:id", (req, res) => {
    res.send('This is where the user collections there items');
}); //view a user's collections (favourites, etc.)

app.post("/user/:id/collections/:id", (req, res) => {
    res.send('adds a list to the user');
});

app.post("/user/:id/collections", (req, res) => {
    res.send('create a list');
}); //create a list

app.delete("/user/:id/collections/:id/delete", (req, res) => {
    res.send('Got a DELETE request at /user')
});

//WIDGETS 

app.get("/widget", (req, res) => {
    // use query to get all widgets
    // take return from query and then res.send it off
    res.send('view all widgets')
});

app.get("/widget/:id", (req, res) => {
    res.send('view a specific widget')
});

app.post("/widget/:id", (req, res) => {
    res.send('change owner information for specific widget')
});

app.post("/widget", (req, res) => {
    res.send('admin can make a new widget')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
app.get("/login")

// Use node to connect to psql db
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
// const db = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'final_project'
// });
db.connect();
module.exports = db;
