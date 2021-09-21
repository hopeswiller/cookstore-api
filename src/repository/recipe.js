const logger = require('../utils/logger');
const db = require('../utils/db');
const { off } = require('npmlog');


class Recipe {
    static async getAllRecipes(limit, offset, name, createdAt) {
        let sql = `
            SELECT id,name,description,instructions,created_date,updated_date
            FROM recipes WHERE 1=1
        `
        let param_count = 0;
        let params = []

        if (name) {
            param_count++;
            sql += ` AND lower(name) = $${param_count}`
            params.push(name.trim().toLowerCase())
        }
        if (createdAt) {
            param_count++
            sql += ` AND created_date::date = $${param_count}`
            params.push(createdAt.trim())
        }

        sql += ` LIMIT $${param_count+1} OFFSET $${param_count+2}`
        params.push(limit,offset)

        logger.debug(sql)
        const rows = await db.query(sql,params)

        return rows
    }

    static async getRecipeById(id) {
        let sql = `
            SELECT id,name,description,instructions,created_date,updated_date
            FROM recipes WHERE id = $1`

        logger.debug(sql)
        const rows = await db.query(sql,[id])

        return rows
    }
}

module.exports = Recipe