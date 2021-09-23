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