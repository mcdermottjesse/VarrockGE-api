module.exports = (db) => {
  const updateWidgetOwner = (userID, widgetID, boughtForPriceCents) => {
    const timestamp = new Date()
    return db.query(`
    INSERT INTO widget_owners(user_id, widget_id, date_purchased, bought_for_price_cents)
    VALUEs ($1, $2, $3, $4)
    RETURNING *
    `, [userID, widgetID, new Date().toUTCString(), boughtForPriceCents])
    .then(response => response.rows[0])
    .catch(err => err);
  };

  return { updateWidgetOwner };
};