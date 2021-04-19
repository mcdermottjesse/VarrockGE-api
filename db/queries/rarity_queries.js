module.exports = (db) => {
  const getAllRarities = () => {
    return db.query(`
    SELECT id AS rarity_id, name
    FROM rarities
    `, [])
    .then(response => response.rows)
    .catch(err => err);
  };

  return {
    getAllRarities
  };
};