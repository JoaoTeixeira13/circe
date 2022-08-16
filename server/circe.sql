
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS to_trade;
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS gardens;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       first VARCHAR NOT NULL CHECK (first != ''),
       last VARCHAR NOT NULL CHECK (last != ''),
       email VARCHAR NOT NULL CHECK (email != '') UNIQUE,
       location VARCHAR NOT NULL CHECK (location != ''),
       imageUrl TEXT,
       bio TEXT,
       password VARCHAR NOT NULL CHECK (password != '')
   );

   CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL REFERENCES users(email),
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

   CREATE TABLE wishlist(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    pid VARCHAR NOT NULL,
    display_pid VARCHAR NOT NULL,
    image_url VARCHAR
  );

   CREATE TABLE to_trade(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    pid VARCHAR NOT NULL,
    display_pid VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    image_url VARCHAR NOT NULL
  );

  CREATE TABLE followers(
    id SERIAL PRIMARY KEY,
    leader_id INT REFERENCES users(id) NOT NULL,
    follower_id INT REFERENCES users(id) NOT NULL 
  );

  CREATE TABLE gardens(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    pid VARCHAR NOT NULL,
    image_url VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);







  