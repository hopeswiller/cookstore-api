const figlet = require('figlet');
const logger = require('./logger');

module.exports = (text) =>{

    figlet(text, (err, data) => {
        if (err) { 
            logger.error('Something went wrong with figlet'); 
            return; 
        }
        console.log(data)
    })
    
}