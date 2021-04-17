module.exports = (db) => {
  const getAllWidgets = () => {
    return db.query(`
    SELECT *
    FROM widgets
    `, [])
    .then(response => response.rows)
    .catch(err => err);
  };

  const updateWidgetForSale = (bool, id) => {
    return db.query(`
    UPDATE widgets 
    SET for_sale_by_owner = $1 
    WHERE id = $2
    `, [bool, id])
    .then(response => response.rows[0])
    .catch(err => err);
  }
  
  const createWidget = (widgetParams) => {
    const queryParams = [
      Number(widgetParams.rarity_id),
      Number(widgetParams.subcategory_id),
      widgetParams.name,
      Number(widgetParams.MSRP_cents),
      widgetParams.for_sale_by_owner,
      Number(widgetParams.current_sell_price_cents),
      widgetParams.hash,
      widgetParams.description
    ]
    return db.query(`
    INSERT INTO widgets (rarity_id, subcategory_id, name, MSRP_cents, for_sale_by_owner, current_sell_price_cents, hash, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING widgets.*
    `, queryParams)
    .then(response => response.rows[0])
    .catch(err => err);
  };
  
  const getWidgetWithWidgetID = (widgetID) => {
    return db.query(`
    SELECT *
    FROM widgets
    WHERE id = $1
    `, [widgetID])
    .then(response => response.rows[0])
    .catch(err => err);
  };

  const updateWidgetPrice = (price, widgetID) => {
    return db.query(`
    UPDATE widgets 
    SET current_sell_price_cents = $1
    WHERE id = $2
    `, [price, widgetID])
    .then(response => response.rows[0])
    .catch(err => err);
  }

  

  return {
    getAllWidgets,
    createWidget,
    getWidgetWithWidgetID,
    updateWidgetPrice,
    updateWidgetForSale
  };
};