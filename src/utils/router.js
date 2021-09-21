const express = require('express')

const users = require('../routes/user');
const recipes = require('../routes/recipe');
const auth_routes = require('../routes/auth');
// const ingredients = require('../routes/ingredient')

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/users", users);
    app.use("/api/recipes", recipes);
    app.use("/api/auth", auth_routes);
}