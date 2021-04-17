// load .env data into process.env
require("dotenv").config();

// Query functions require. Must be defined before db is defined.
const user_queries = require("./db/queries/user_queries");
const widget_queries = require("./db/queries/widget_queries");
const list_queries = require("./db/queries/list_queries");
const widget_owner_queries = require("./db/queries/widget_owner_queries");
const list_content_queries = require("./db/queries/list_content_queries");

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const port = 3000;

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan("dev"));

// Cookies
const cookieSession = require("cookie-session");
const sessionConfig = {
  name: "session",
  secret: "aSuperSecretSecretForCookies!",
};
app.use(cookieSession(sessionConfig));

// Use node to connect to psql db
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const { promises } = require("fs");
const db = new Pool(dbParams);
db.connect();
module.exports = db;

// Query functions
const { getUserInfoWithEmail, getUserInfoWithUserID } = user_queries(db);
const { getAllWidgets, createWidget, getWidgetWithWidgetID, updateWidgetPrice, updateWidgetForSale } = widget_queries(
  db
);
const {
  getListsWithUserID,
  getListContentWithListID,
  createList,
  updateListWithListID,
  deleteListWithListID,
} = list_queries(db);
const { updateWidgetOwner, getAllWidgetOwners } = widget_owner_queries(db);
const { addMultipleWidgetsToList, deleteAllWidgetsFromListID } = list_content_queries(db);

app.get("/login", (req, res) => {
  res.send("This is the login page");
});

app.post("/login", (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  getUserInfoWithEmail(email).then((response) => {
    if (password === response.password) {
      req.session.user_id = response.id;
      res.send(response);
    }
  });
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.send("Successfully logged out!");
});

app.get("/", (req, res) => {
  res.send("Hello there");
}); //we can say homepage, serve the index.js and the bundle (index)

app.get("/user/:id", (req, res) => {
  const userID = req.params.id;
  getUserInfoWithUserID(userID).then((response) => res.send(response));
});

//User/:id/collections

app.get("/user/:id/collections/:listid", (req, res) => {
  // Displays all cards in a certain list
  // const userID = req.params.id; // I don't think this parameter is required. Maybe delete this line later
  const listID = req.params.listid;
  getListContentWithListID(listID).then((response) => {
    res.send(response);
  });
});

app.get("/user/:id/collections", (req, res) => {
  // Views all the lists from a certain user
  const userID = req.params.id;
  getListsWithUserID(userID).then((response) => res.send(response));
});

app.post("/user/:id/collections/:listid", (req, res) => {
  // Edits a users list (list name and description only)
  // const userID = req.params.id; // I don't think this parameter is required. Maybe delete this line later
  const listID = req.params.listid;
  console.log('req.body', req.body);
  // const listName = "Changed List Name"; // Hardcoded. Will come from forms
  // const listDesc = "Changed List Description"; //Hardcoded. Will come from forms
  const {listName, listDesc, listItems} = req.body;
  updateListWithListID(listID, listName, listDesc)
  .then((response) =>{
    deleteAllWidgetsFromListID(listID)
  })
  .then((response) => {
    res.send(response)
    addMultipleWidgetsToList(listID, listItems)
  })
  .then(response => {
    res.send(`Collection ID ${listID} "${listName}" updated. It contains the following widgetes: ${listItems}`);
  })
});

app.post("/user/:id/collections", (req, res) => {
  // Create a new list for a user and add widgets to it
  const userID = req.params.id;
  const {listName, listDesc, listItems} = req.body;
  createList(userID, listName, listDesc).then((response) => {
    const listID = response.id;
    addMultipleWidgetsToList(listID, listItems)
    res.send(`Collection ID ${listID} "${listName}" created. Widgets ${listItems} added to it.`);
  });
});

app.post("/user/:id/collections/:id/delete", (req, res) => {
  // Delete a list for a certain user
  const userID = req.params.id; // Use to check if user is the author of the list
  // Function to check if user is author
  const listID = req.params.listid;
  deleteListWithListID(listID).then((response) => res.send(response));
});

//WIDGETS

app.get("/widgets", (req, res) => {
  getAllWidgets().then((response) => res.send(response));
});

app.get("/widgets/owners", (req, res) => {
  getAllWidgetOwners()
  .then(response => {
    res.send(response);
  })
})

app.get("/widgets/:id", (req, res) => {
  const widgetID = req.params.id;
  console.log(widgetID)
  getWidgetWithWidgetID(widgetID)
  .then((response) => res.send(response));
});

app.post("/widgets/checkout", (req, res) => {
  // req.body consists of an array of items to be checked out
  // Create an array of promises to be fed into Promise.all
  const postRequestArray = [];
  for (const postRequest of req.body) {
    postRequestArray.push(updateWidgetForSale(postRequest.for_sale_by_owner, postRequest.widgetID))
    postRequestArray.push(updateWidgetOwner(postRequest.userID, postRequest.widgetID, postRequest.boughtForPriceCents))
  }

  Promise.all(postRequestArray)
  .then(response => {
    console.log("checkout", response)
  })
})

app.post("/widgets/:id", (req, res) => {
  console.log('req.body updateSell', req.body)
  const widgetID = req.params.id;
  const {sellPrice} = req.body; 
  // console.log('widget and sell price', widgetID, sellPrice)
  //update the current_sell_price_cents of a widget
  updateWidgetPrice(sellPrice, widgetID).then((response) => res.send(response));
});

app.post("/widgets", (req, res) => {
 // widgetParams allows admin form to create a custom nft(no image yet)
  const widgetParams = {
    rarity_id: req.body.rarityID,
    subcategory_id: req.body.categoryID,
    name: req.body.name, 
    MSRP_cents: req.body.cost,
    for_sale_by_owner: true, 
    current_sell_price_cents: req.body.cost, 
    hash: "dummyTHIChash1",
    description: req.body.description
  }
  createWidget(widgetParams).then((response) => res.send(response));
});

app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});

