const { response } = require('express');
const db = require('../../server');

const addWidgetToList = (listID, widgetID) => {
  return db.query(`
  INSERT INTO list_contents(list_id, widget_id)
  VALUES($1, $2)
  RETURNING *
  `, [listID, widgetID])
  .then(response => response.rows)
  .catch(err => err)
};

const addMultipleWidgetsToList = (listID, widgetIDArray) => {
  for (const widgetID of widgetIDArray) {
    addWidgetToList(listID, widgetID)
  }
};

//EXPORT FUNCTIONS
module.exports = {
  addMultipleWidgetsToList
};