require('dotenv').config({path: '../.env'});

const {getUserInfoWithEmail, getUserInfoWithUserID} = require('./queries/user_queries');
const {getAllWidgets, createWidget, getWidgetWithWidgetID} = require('./queries/widget_queries');
const {getListsWithUserID, getListContentWithListID, createList, updateListWithListID, deleteListWithListID} = require('./queries/list_queries');
const {updateWidgetOwner} = require('./queries/widget_owner_queries');
const {addMultipleWidgetsToList} = require('./queries/list_content_queries');



// ################
// USER QUERIES
// ################

// getUserInfoWithEmail("ray@ray.com")
// .then(res => {
//   console.log('Getting user info with email ray@ray.com:')
//   console.log(res)
// })

// getUserInfoWithUserID(1)
// .then(res => {
//   console.log('Getting user info with user id of 1:')
//   console.log(res)
// })


// ################
// WIDGET QUERIES
// ################


// getAllWidgets()
// .then(res => {
//   console.log('Grabbing all widgets')
//   console.log(res)
// })

// widgetParams = {
//   rarity_id: 4,
//   subcategory_id: 1,
//   name: 'Dragonite',
//   MSRP_cents: 3500,
//   for_sale_by_owner: true,
//   current_sell_price_cents: 4500,
//   hash: 'hashno13',
//   description: 'Everyones favorite first gen dragon'
// }

// createWidget(widgetParams)
// .then(res => {
//   console.log('Made a new widget')
//   console.log(res)
// })

// getWidgetWithWidgetID(5)
// .then(res => {
//   console.log('Retrieving widget with ID of 5')
//   console.log(res)
// })


// ################
// LIST QUERIES
// ################

// getListsWithUserID(2)
// .then(res => {
//   console.log('Getting all lists for user id of 2:')
//   console.log(res)
// })

// getListContentWithListID(1)
// .then(res => {
//   console.log('The widgets associated with list id of 1 are:')
//   console.log(res)
// })

// createList(2, 'Another blank list', 'Ill do this next week')
// .then(res => {
//   console.log('Creating a new list for user 2')
//   console.log(res)
// })

// deleteListWithListID(4)
// .then(res => {
//   console.log('Deleting list with ID of 4')
//   console.log(res)
// })

// updateListWithListID(2, 'Changed Name', 'Changed Description')
// .then(res => {
//   console.log('Updating list ID 2 with a different name and description')
//   console.log(res)
// })

// updateWidgetOwner(3, 1, 7000)
// .then(res => {
//   console.log('User 3 just bought Widget 1 for 7000 cents')
//   console.log(res)
// })

// const widgetIDArray = [9, 10, 11, 12]
// addMultipleWidgetsToList(2, widgetIDArray)
// console.log('I actually added stuff to list_contents table')
