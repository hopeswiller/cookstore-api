const logger = require('../utils/logger');
const db = require('../utils/db');

class User {
    static async getInitialUser() {
        logger.debug('working');
    }

    static async getAllUsers(limit, offset) {
        let sql = `SELECT id,name,username,created_date,updated_date,last_login from users LIMIT $1 OFFSET $2`;
        let result;

        // sql += ` LIMIT $1 OFFSET $2`;

        result = await db.query(sql, [limit, offset]);
        return result
    }

    static async getUserById(userId) {
        const sql = `SELECT id,name,username,created_date,updated_date from users WHERE id = $1`;
        let result = await db.query(sql, [userId]);
        return result
    }

    static async getUserByUsername(username) {
        const sql = `SELECT id,name,username,password,created_date,updated_date from users WHERE username = $1`;
        logger.debug(sql)
        let result = await db.query(sql, [username]);
        return result
    }

    static async createUser(data) {
        const sql = `INSERT INTO users (name,username,password,created_date,updated_date)
                    VALUES ($1, $2, $3, now(),now()) RETURNING id;`

        logger.debug(sql)

        const { name, username, password } = data;
        let result = await db.queryWithClient(sql, [name, username, password]);
        return result
    }

    static async deleteUser(userIdorUsername) {
        let sql = `DELETE FROM users`
        if (isNaN(userIdorUsername)) {
            // param is username
            sql += ` WHERE username = $1 RETURNING *;`
        } else {
            // param is userId
            sql += ` WHERE id = $1 RETURNING *;`
        } 
        
        logger.debug(sql)

        let result = await db.queryWithClient(sql, [userIdorUsername]);
        return result
    }
}



module.exports = User