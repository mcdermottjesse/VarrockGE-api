module.exports = (db) => {
  const getAllRarities = () => {
    return db.query(`
    SELECT *
    FROM rarities
    `, [])
    .then(response => response.rows)
    .catch(err => err);
  };

  return {
    getAllRarities
  };
};