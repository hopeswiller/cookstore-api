const logger = require('../utils/logger');
const Recipe = require('../repository/recipe');
const { Router } = require('express');
const recipes = Router();


/**
 * A Recipe
 * @typedef {object} Recipe
 * @property {string} id - Recipe id
 * @property {string} name - Name
 * @property {string} description - Description
 * @property {string} instrucions - Instrucions
 * @property {string} createdat - Recipe create date
 * @property {string} updatedat - Recipe last updated date
 */


/**
 * GET /api/recipes
 * @summary Endpoint to get paginated list of recipes
 * @tags recipes
 * @param {string} name.query - Name of recipe
 * @param {string} createdAt.query -  Created Date of recipe
 * @param {string} page.query - Page number
 * @param {string} limit.query - Page limit
 * @return {array<Recipe>} 200 - success response - application/json
 * @return {string} 500 - internal server error
 */
recipes.get('/', async (req, res) => {
    logger.debug('Getting paginated list of recipes')
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset = (page - 1) * limit;

        const { name, createdAt } = req.query;
        const recipes = await Recipe.getAllRecipes(limit, offset, name, createdAt);

        res.status(200).send({
            "count": recipes.length,
            "page": page,
            "offset": offset,
            "limit": limit,
            "rows": recipes
        })
    } catch (error) {
        res.status(500).send({ error: error })
    }

});



/**
 * GET /api/recipes/{id}
 * @summary Endpoint to get recipe by id
 * @tags recipes
 * @param {string} id.path.required - recipe id
 * @return {Recipe} 200 - success response - application/json
 * @return {string} 404 - recipe not found response
 * @return {object} 500 - internal server error
 * @example response - 200 - success response example
 * [
 *   {
 *     "id": "3",
 *      "name": "Chocolate Cake",
 *      "description": "Yummy cake",
 *      "instructions": "Add eggs, flour, chocolate to pan. Bake at 350 for 1 hour",
 *      "created_date": "2021-09-20T23:30:54.149Z",
 *      "updated_date": "2021-09-20T23:30:54.149Z"
 *   }
 * ]
 */
recipes.get('/:id', async (req, res) => {
    const { id } = req.params
    logger.debug(`Getting recipes by id : ${id}`)

    try {
        const recipe = await Recipe.getRecipeById(id);

        if (!recipe.length) {
            res.status(404).send('Recipe Not Found');
        }
        else {
            res.status(200).send({
                "row": recipe
            })
        }

    } catch (error) {
        res.status(500).send({ error: error })
    }

});



module.exports = recipes;