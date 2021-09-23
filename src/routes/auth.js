const logger = require('../utils/logger');
const passport = require('passport');

const { Router } = require('express');
const auth = Router();



/**
 * POST /api/auth/login
 * @summary Endpoint to login user
 * @tags auth
 * @param {string} username.form.required - Username - application/x-www-form-urlencoded
 * @param {string} password.form.required - Password - application/x-www-form-urlencoded
 * @param {boolean} userData.query - userdata
 * @return {object} 200 - success response
 * @return {string} 401 - Unauthorised response
 */
auth.post('/login',
    passport.authenticate('local'),
    async (req, res) => {

        var userData = JSON.parse(req.query.userData || 'false')
        if (userData) {
            res.status(200).send({
                authenticated: true,
                user: {
                    id: req.user.id,
                    name: req.user.name,
                    username: req.user.username,
                    created_date: req.user.created_date,
                    updated_date: req.user.updated_date
                }
            });
            return;
        }
        res.status(200).send({authenticated: true});
    }
);

module.exports = auth;