const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: new transports.Console({
        level: process.env.LOG_LEVEL || 'debug',
    }),
    format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp(),
        format.printf(i => `${i.timestamp} : ${i.level} : ${i.message}`)
    )
})
