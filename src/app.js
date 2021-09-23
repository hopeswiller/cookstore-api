const app = require('express')();
const logger = require('./utils/logger');
const mountRoutes = require('./utils/router');
const figlet = require('./utils/figlet');
const renderSwagger = require('./docs/swagger');
const passport = require('passport');
require('dotenv').config();


// middlewares
app.use(passport.initialize());
app.use(passport.session());
require('./utils/validation').authenticate(passport);
mountRoutes(app)
renderSwagger(app);



app.get('/', (req,res) => {
    logger.info("CookStore Api running successfully");
    res.send("CookStore Api running successfully!!!");
})


app.get('/status', (req,res) => {
    res.send("CookStore Api work is in progress");
})



app.listen(process.env.PORT || 5000, (err) => {
    if (err) throw err;

    figlet('CookStore');
    logger.info(`Server Running on port ${process.env.PORT || 5000}`)
})

process.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});

process.on('SIGINT', function onSigint() {
  process.exit();
});

process.on('SIGTERM', function onSigterm() {
  process.exit();
});