const logger = require('../utils/logger');
const User = require('../repository/user');
const { encryptPassword, decryptPassword } = require('../utils/encrypt')
const { Router } = require('express');
const users = Router();


users.get('/', async (req, res) => {
    logger.debug('Getting list of users')
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = limit * (page - 1);

    var data = await User.getAllUsers(limit, offset)

    res.status(200).send({
        "count": data.length,
        "rows": data
    })
});

users.get('/:userId', async (req, res) => {
    const { userId } = req.params
    logger.debug(`Getting user with id : ${userId}`)

    try {
        var data = await User.getUserById(userId)
        if (!data.length) {
            return res.status(404).send(`No user with id ${userId} exist`)
        }
        res.status(200).send({
            "row": data
        })
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


users.delete('/delete/:userIdorUsername', async (req, res) => {
    const { userIdorUsername } = req.params;
    logger.debug(`Deleting user`)

    try {
        const data = await User.deleteUser(userIdorUsername)
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