-- Database Type : Postgres

-- DROP DATABASE IF EXISTS cookstore;

-- CREATE DATABASE cookstore
--     WITH 
--     ENCODING = 'UTF8'
--     CONNECTION LIMIT = -1;

-- Six tables in the database

CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    created_date TIMESTAMP NOT NULL,
    updated_date TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);


CREATE TABLE IF NOT EXISTS recipes(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    description VARCHAR(50),
    instructions VARCHAR(500),
    created_date TIMESTAMP NOT NULL,
    updated_date TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS user_recipes(
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_on TIMESTAMP NOT NULL,
    PRIMARY KEY(user_id,recipe_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES users(id),
    CONSTRAINT fk_recipe FOREIGN KEY (recipe_id)
        REFERENCES recipes(id)
);


CREATE TABLE IF NOT EXISTS ingredients(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS measurements(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);


CREATE TABLE IF NOT EXISTS recipes_ingredients(
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    measurement_id INT,
    amount NUMERIC(10,2), 
    PRIMARY KEY (recipe_id, ingredient_id),
    CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) 
        REFERENCES recipes(id),
    CONSTRAINT fk_ingredient FOREIGN KEY (ingredient_id) 
        REFERENCES ingredients(id),
    CONSTRAINT fk_measurement FOREIGN KEY (measurement_id) 
        REFERENCES measurements(id)
);