const logger = require('../utils/logger');
const User = require('../repository/user');
const { encryptPassword, decryptPassword } = require('../utils/validation')
const { Router } = require('express');
const users = Router();


/**
 * A User
 * @typedef {object} User
 * @property {string} id - User id
 * @property {string} name - Fullname
 * @property {string} username - Username
 * @property {string} password - User Encrypted Password
 * @property {string} createdate - User create date
 * @property {string} updatedate - User last updated date
 * @property {string} last_login - User last login date
 */

/**
 * GET /api/users/
 * @summary Endpoint to get paginated list of users
 * @tags users
 * @param {string} page.query - Page number
 * @param {string} limit.query - Page limit
 * @return {array<User>} 200 - success response - application/json
 * @return {string} 500 - internal server error
 */
users.get('/', async (req, res) => {
    logger.debug('Getting list of users')
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = limit * (page - 1);

    var data = await User.getAllUsers(limit, offset)

    res.status(200).send({
        "count": data.length,
        "page": page,
        "offset": offset,
        "limit": limit,
        "rows": data
    })
});




/**
 * GET /api/users/{userId}
 * @summary Endpoint to get user by id
 * @tags users
 * @param {string} userId.path.required - user id
 * @return {User} 200 - success response - application/json
 * @return {string} 404 - user not found response
 * @return {object} 500 - internal server error
 * @example response - 200 - success response example
 * [
 *   {
 *      "id": "1",
 *      "name": "Chocolate Girl",
 *      "username": "YummyCho",
 *      "created_date": "2021-09-20T23:30:54.149Z",
 *      "updated_date": "2021-09-20T23:30:54.149Z"
 *   }
 * ]
 */
users.get('/:userId', async (req, res) => {
    const { userId } = req.params
    logger.debug(`Getting user with id : ${userId}`)

    try {
        var data = await User.getUserById(userId)
        if (!data.length) {
            return res.status(404).send(`No user with id ${userId} exist`)
        }
        else {
            res.status(200).send({
                "row": data
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

});


users.get('/username/:username', async (req, res) => {
    const { username } = req.params
    logger.debug(`Getting user with username : ${username}`)

    var data = await User.getUserByUsername(username)
    res.status(200).send({
        "row": data
    })

});



/**
 * PUT /api/users/create
 * @summary Endpoint to create new user
 * @tags users
 * @param {string} name.form.required - Username - application/json
 * @param {string} username.form.required - Username - application/json
 * @param {string} password.form.required - Password - application/json
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - internal server error
 */
users.put('/create', async (req, res) => {
    logger.debug(`Creating a new user`)
    const { name, username, password } = req.body;

    try {
        const hash = await encryptPassword(password);
        const user = {
            name: name,
            username: username,
            password: hash
        }
        var data = await User.createUser(user)

        res.status(200).json({
            message: `Success, User created with id: ${data[0].id}`
        })

        logger.debug(`User created successfully`)

    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error
        })
    }

})


/**
 * DELETE /api/users/delete/{IdorName}
 * @summary Endpoint to delete a user
 * @tags users
 * @param {string} IdorName.path.required - Username - application/json
 * @return {object} 200 - success response - application/json
 * @return {object} 500 - internal server error
 */
users.delete('/delete/:IdorName', async (req, res) => {
    const { IdorName } = req.params;
    logger.debug(`Deleting user`)

    try {
        const data = await User.deleteUser(IdorName)
        res.status(200).send({
            message: `Success, User ${data[0].name} deleted successfully`
        })

    } catch (error) {
        res.status(500).json({
            message: "Error deleting User",
            error: error
        })
    }
})

module.exports = users;