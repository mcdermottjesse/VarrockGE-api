const db = require('../../server');

// Gets all user data with email
const getUserInfoWithEmail = (email) => {
  return db.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email])
  .then(response => response.rows[0])
  .catch(err => err);
};

// Gets all user data with user ID
const getUserInfoWithUserID = (userID) => {
  return db.query(`
  SELECT * FROM users
  WHERE id = $1
  `, [userID])
  .then(response => response.rows[0])
  .catch(err => err);
};

//EXPORT FUNCTIONS
module.exports = {
  getUserInfoWithEmail,
  getUserInfoWithUserID
};
