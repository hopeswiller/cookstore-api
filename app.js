const app = require('express')();
const logger = require('./src/utils/logger');
const mountRoutes = require('./src/utils/router')
const figlet = require('./src/utils/figlet')
const dotenv = require('dotenv');
dotenv.config()


// middlewares
mountRoutes(app)



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

