const { Pool } = require('pg');
const dotenv = require('dotenv');
const looger = require('./logger');
const logger = require('./logger');
dotenv.config()

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
    // max:  // number of connection in the pool - default 10
    // connectionTimeoutMillis: // how long it takes for a pool to give connection (0 = forever)
    // idleTimeoutMillis: // how long it takes for a connection to be destroyed if not being used (0 = forever)
});


module.exports = {
    // random client in the pool
    query: async (queryString, params = null) => {

        logger.info('Running query with random client from pool')

        let res;
        if (params != null ) {
            const query_config = {
                text: queryString,
                values: params
            }
            res = await pool.query(query_config)
        }
        else {
            res = await pool.query(queryString)
        }

        return res.rows || []

    },

    // checkout a specific client in the pool for transaction queries  
    // and release client resources after
    queryWithClient: async (queryString, params = null) => {
        let res;
        const client = await pool.connect()
        try {

            await client.query('BEGIN')

            if (params === null) {
                res = await client.query(queryString)
            } else {
                const query_config = {
                    text: queryString,
                    values: params
                }
                res = await client.query(query_config)
            }

            await client.query('COMMIT')
        
        } catch (err) {
            await client.query('ROLLBACK')
            logger.error(`Error completing query, rolling back : ${err}`)
            throw err

        } finally {
            // release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
            return res.rows || []
        }
    }
}