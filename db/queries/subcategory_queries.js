module.exports = (db) => {
  const getAllSubcategories = () => {
    return db.query(`
    SELECT *
    FROM subcategories
    `, [])
    .then(response => response.rows)
    .catch(err => err);
  };

  return {
    getAllSubcategories
  };
};