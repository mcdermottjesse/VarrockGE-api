const db = require('../../server');

const getListsWithUserID = (userID) => {
  return db.query(`
  SELECT lists.id, lists.user_id, lists.name, lists.description, users.email
  FROM lists
  JOIN users ON lists.user_id = users.id
  WHERE users.id = $1
  `, [userID])
  .then(response => response.rows)
  .catch(err => err);
};

const getListContentWithListID = (listID) => {
  return db.query(`
  SELECT list_contents.list_id, list_contents.widget_id, lists.name AS list_name, lists.description AS list_description, widgets.name, widgets.description, widgets.rarity_id, widgets.subcategory_id, widgets.msrp_cents, widgets.for_sale_by_owner, widgets.current_sell_price_cents, widgets.hash
  FROM list_contents
  JOIN lists ON lists.id = list_contents.list_id
  JOIN widgets ON list_contents.widget_id = widgets.id
  `, [])
  .then(response => response.rows)
  .catch(err => err);
};

const createList = (userID, listName, listDesc) => {
  return db.query(`
  INSERT INTO lists (user_id, name, description)
  VALUES($1, $2, $3)
  RETURNING *
  `, [userID, listName, listDesc])
  .then(response => response.rows[0])
  .catch(err => err)
}

const updateListWithListID = (listID, listName, listDesc) => {
  return db.query(`
  UPDATE lists
  SET name = $1, description = $2
  WHERE id = $3
  RETURNING *
  `, [listName, listDesc, listID])
  .then(response => response.rows[0])
  .catch(err => err)
};

const deleteListWithListID = (listID) => {
  return db.query(`
  DELETE FROM lists
  WHERE id = $1
  RETURNING *
  `, [listID])
  .then(response => response.rows[0])
  .catch(err => err)
};

//EXPORT FUNCTIONS
module.exports = {
  getListsWithUserID,
  getListContentWithListID,
  createList,
  updateListWithListID,
  deleteListWithListID
};