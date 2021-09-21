-- Database Type : Postgres

DROP DATABASE IF EXISTS cookstore;

CREATE DATABASE cookstore
    WITH 
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

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

-- insert data
INSERT INTO measurements (name) 
VALUES ('cup(s)'), ('teaspoon(s)'), ('tablespoon(s)'), ('packet(s)');

INSERT INTO ingredients (name) 
VALUES ('flour'), ('egg'), ('yeast'), ('cheese'), ('olive oil'), ('tomato sauce'),  
('salt'), ('sugar'), ('chocolate'), ('vanilla extract');


-- insert first recipe and ingredients
INSERT INTO recipes (name, description,created_date,updated_date)
VALUES('Simple Cheese Pizza', 'A great pizza that is really easy to make.',now(),now());

INSERT INTO recipes_ingredients (recipe_id, ingredient_id, measurement_id, amount) 
VALUES (1, 1, 1, 2.5);

INSERT INTO recipes_ingredients (recipe_id, ingredient_id, measurement_id, amount) 
VALUES (1, 3, 4, 1);

INSERT INTO recipes_ingredients (recipe_id, ingredient_id, measurement_id, amount) 
VALUES (1, 8, 2, 2);

INSERT INTO recipes_ingredients (recipe_id, ingredient_id, measurement_id, amount) 
VALUES (1, 6, 1, 1);

INSERT INTO recipes_ingredients (recipe_id, ingredient_id, amount) 
VALUES (1, 2, 2);


-- insert second recipe and ingredients
INSERT INTO recipes (name, description,instructions,created_date,updated_date)
VALUES('Boiled Egg', 'A single boiled egg', 'Add egg to cold water. Bring water to boil. Cook.',now(),now());


INSERT INTO recipes_ingredients (recipe_id, ingredient_id, amount) 
VALUES (2, 2, 1);



-- insert third recipe and ingredients
INSERT INTO recipes (name, description,instructions,created_date,updated_date)
VALUES('Chocolate Cake', 'Yummy cake', 'Add eggs, flour, chocolate to pan. Bake at 350 for 1 hour',now(),now());


INSERT INTO recipes_ingredients (recipe_id, ingredient_id, amount) 
VALUES (3, 2, 3);

INSERT INTO recipes_ingredients (recipe_id, ingredient_id, measurement_id, amount) 
VALUES (3, 7, 2, 2);

INSERT INTO recipes_ingredients (recipe_id, ingredient_id, measurement_id, amount) 
VALUES (3, 8, 1, 2);

INSERT INTO recipes_ingredients (recipe_id, ingredient_id, measurement_id, amount) 
VALUES (3, 9, 1, 1);


select 
    r."name",
    r.instructions,
    string_agg(ri.amount::float || ' ' || coalesce(m.name,'') || ' ' || i.name, ', ') all_ingredients
from recipes r 
left join recipes_ingredients ri on r.id = ri.recipe_id
join ingredients i on i.id = ri.ingredient_id
left join measurements m on m.id = ri.measurement_id
group by 1,2