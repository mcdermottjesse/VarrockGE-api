// load .env data into process.env
require('dotenv').config();

// import query functions
const user_queries = require('./db/queries/user_queries');
// {getUserInfoWithEmail, getUserInfoWithUserID} = require('./db/queries/user_queries');
const {getAllWidgets, createWidget, getWidgetWithWidgetID} = require('./db/queries/widget_queries');
const {getListsWithUserID, getListContentWithListID, createList, updateListWithListID, deleteListWithListID} = require('./db/queries/list_queries');
const {updateWidgetOwner} = require('./db/queries/widget_owner_queries');
const {addMultipleWidgetsToList} = require('./db/queries/list_content_queries');

const express = require("express");
const path = require('path');
const morgan = require('morgan');
const cors = require('cors')
const cookieSession = require('cookie-session');
const port = 3000;


const app = express();
app.use(morgan('dev'));

// Use node to connect to psql db
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
module.exports = db;
const {getUserInfoWithEmail, getUserInfoWithUserID} = user_queries(db)

app.post("/login", (req, res) => {
    res.send('POSTING to login');
}) // express
app.get("/", (req, res) => {
    res.send('Hello there');
}) //we can say homepage, serve the index.js and the bundle (index)
app.get("/user/:id", (req, res) => {
    const userID = req.params.id;
    getUserInfoWithUserID(userID)
    .then(response => {
        res.send(response)
    })
    

});


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

