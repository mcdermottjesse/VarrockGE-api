DROP TABLE IF EXISTS widget_owners CASCADE;

CREATE TABLE widget_owners (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  widget_id INTEGER REFERENCES widgets(id) ON DELETE CASCADE,
  date_purchased DATE,
  bought_for_price_cents INTEGER
);