const logger = require('../utils/logger');
const { Router } = require('express');
const recipes = Router();


recipes.get('/', async (req, res) => {
    logger.debug('Getting list of recipes')
    res.send('done')
});

recipes.get('/:name', async (req, res) => {
    const { name } = req.params
    logger.debug(`Getting recipes by name : ${name}`)
    res.send('done')
});



module.exports = recipes;