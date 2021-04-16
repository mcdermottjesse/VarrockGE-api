module.exports = (db) => {
  const updateWidgetOwner = (userID, widgetID, boughtForPriceCents) => {
    return db.query(`
    INSERT INTO widget_owners(user_id, widget_id, date_purchased, bought_for_price_cents)
    VALUEs ($1, $2, $3, $4)
    RETURNING *
    `, [userID, widgetID, new Date().toUTCString(), boughtForPriceCents])
    .then(response => response.rows[0])
    .catch(err => err);
  };

  const getAllWidgetOwners = () => {
    return db.query(`
    SELECT tt.*
    FROM widget_owners tt
    INNER JOIN
        (SELECT widget_id, MAX(id) AS MaxDateTime
        FROM widget_owners
        GROUP BY widget_id) groupedtt 
    ON tt.widget_id = groupedtt.widget_id 
    AND tt.id = groupedtt.MaxDateTime
    `, [])
    .then(response => response.rows)
    .catch(err => err);
  }

  return { updateWidgetOwner, getAllWidgetOwners };
};