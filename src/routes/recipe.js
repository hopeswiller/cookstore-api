const logger = require('../utils/logger');
const Recipe = require('../repository/recipe');
const { Router } = require('express');
const recipes = Router();


recipes.get('/', async (req, res) => {
    logger.debug('Getting paginated list of recipes')
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset = (page - 1) * limit;

        const { name, createdAt } = req.query;
        const recipes = await Recipe.getAllRecipes(limit,offset,name,createdAt);

        res.status(200).send({
            "count": recipes.length,
            "page": page,
            "offset": offset,
            "limit": limit,
            "rows": recipes
        })
    } catch (error) {
        res.status(500).send({error:error})
    }
    
});

recipes.get('/:name', async (req, res) => {
    const { name } = req.params
    logger.debug(`Getting recipes by name : ${name}`)
    res.send('done')
});



module.exports = recipes;