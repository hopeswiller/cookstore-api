const logger = require('../utils/logger');
const db = require('../utils/db');


class Recipe {
    static async getAllRecipes(limit, offset, name, createdAt) {
        let sql = `
            SELECT id,name,description,instructions,created_date,updated_date
            FROM recipes WHERE 1=1
        `
        let param_count = 0;
        let params = []

        logger.debug(`createdAt:${createdAt}`)
        logger.debug(`name:${name}`)
        if (name) {
            param_count++;
            sql += ` AND lower(name) = $${param_count}`
            // (index,0,item)
            params.slice(param_count - 1, 0, name)
        }
        if (createdAt) {
            param_count++
            sql += ` AND created_date::date = trim($${param_count})`

            params.slice(param_count - 1, 0, createdAt)
        }

        // sql += ''

        logger.debug(`params ${params}`)
        logger.debug(`param_count: ${param_count}`)
        logger.debug(sql)

        // const rows = await db.query(sql)

        // return rows
    }

    static async getRecipeById() {

    }

    static async getRecipeByName() {

    }
}

module.exports = Recipe