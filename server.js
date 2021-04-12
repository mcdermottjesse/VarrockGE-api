// load .env data into process.env
require('dotenv').config();

const user_queries = require('./db/queries/user_queries');
const widget_queries = require('./db/queries/widget_queries');
const list_queries = require('./db/queries/list_queries');
const widget_owner_queries = require('./db/queries/widget_owner_queries');
const list_content_queries = require('./db/queries/list_content_queries');

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
const {getUserInfoWithEmail, getUserInfoWithUserID} = user_queries(db);
const {getAllWidgets, createWidget, getWidgetWithWidgetID} = widget_queries(db);
const {getListsWithUserID, getListContentWithListID, createList, updateListWithListID, deleteListWithListID} = list_queries(db);
const {updateWidgetOwner} = widget_owner_queries(db)
const {addMultipleWidgetsToList} = list_content_queries(db)

app.post("/login", (req, res) => {
    // Verify user login credentials
    // Set cookie
    res.send('POSTING to login');
}) 
app.get("/", (req, res) => {
    res.send('Hello there');
}) //we can say homepage, serve the index.js and the bundle (index)
app.get("/user/:id", (req, res) => {
    const userID = req.params.id;
    getUserInfoWithUserID(userID)
    .then(response => res.send(response))
});


//User/:id/collections

app.get("/user/:id/collections/:listid", (req, res) => {
    // Displays all cards in a certain list
    // const userID = req.params.id; // I don't think this parameter is required. Maybe delete this line later
    const listID = req.params.listid;
    getListContentWithListID(listID)
    .then(response => res.send(response))
});

app.get("/user/:id/collections", (req, res) => {
    // Views all the lists from a certain user
    const userID = req.params.id;
    getListsWithUserID(userID)
    .then(response => res.send(response))
});

app.post("/user/:id/collections/:listid", (req, res) => {
    // Edits a users list (list name and description only)
    // const userID = req.params.id; // I don't think this parameter is required. Maybe delete this line later
    const listID = req.params.listid;
    const listName = 'Changed List Name'; // Hardcoded. Will come from forms
    const listDesc = 'Changed List Description'; //Hardcoded. Will come from forms
    updateListWithListID(listID, listName, listDesc)
    .then(response => res.send(response))
});

app.post("/user/:id/collections", (req, res) => {
    // Create a new list for a user
    const userID = req.params.id;
    const listName = 'Example List Name'; // Hardcoded. Will come from forms
    const listDesc = 'Example List Description'; //Hardcoded. Will come from forms
    createList(userID, listName, listDesc)
    .then(response => res.send(response))
});

app.post("/user/:id/collections/:listid/delete", (req, res) => {
    // Delete a list for a certain user
    const userID = req.params.id; // Use to check if user is the author of the list
    // Function to check if user is author
    const listID = req.params.listid;
    deleteListWithListID(listID)
    .then(response => res.send(response))
});

//WIDGETS 

app.get("/widget", (req, res) => {
    getAllWidgets()
    .then(response => res.send(response))
});

app.get("/widget/:id", (req, res) => {
    const widgetID = req.params.id;
    getWidgetWithWidgetID(widgetID)
    .then(response => res.send(response))
});

app.post("/widget/:id", (req, res) => {
    const userID = 3; // Use cookies to get UserID. Hardcoded for now
    const widgetID = req.params.id;
    const boughtForPriceCents = 7000; // Use forms to get this value. Hardcoded for now
    updateWidgetOwner(userID, widgetID, boughtForPriceCents)
    .then(response => res.send(response))
});

app.post("/widget", (req, res) => {
    // Protect this route so only admins may access
    // The widget must have the following object structure:
    // The below values are hardcoded for now. Real values will come from a form
    const widgetParams = {
        rarity_id: 4,
        subcategory_id: 1,
        name: 'Dragonite',
        MSRP_cents: 3500,
        for_sale_by_owner: true,
        current_sell_price_cents: 4500,
        hash: 'hashno13',
        description: 'Everyones favorite first gen dragon'
    };
    createWidget(widgetParams)
    .then(response => res.send(response))
});

app.listen(port, () => {
    console.log(`Express server listening on http://localhost:${port}`);
})

