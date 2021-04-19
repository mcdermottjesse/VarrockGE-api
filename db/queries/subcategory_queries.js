module.exports = (db) => {
  const getAllSubcategories = () => {
    return db.query(`
    SELECT id AS subcategory_id, name
    FROM subcategories
    `, [])
    .then(response => response.rows)
    .catch(err => err);
  };

  return {
    getAllSubcategories
  };
};