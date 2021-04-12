DROP TABLE IF EXISTS widgets CASCADE;

CREATE TABLE widgets (
  id SERIAL PRIMARY KEY NOT NULL,
  rarity_id INTEGER REFERENCES rarities(id) ON DELETE CASCADE,
  subcategory_id INTEGER REFERENCES subcategories(id) ON DELETE CASCADE,
  name VARCHAR(255),
  MSRP_cents INTEGER,
  for_sale_by_owner BOOLEAN,
  current_sell_price_cents INTEGER,
  hash VARCHAR(255),
  description TEXT
);