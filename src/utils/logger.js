const { createLogger, format, transports } = require('winston');


let _transports = []
NODE_ENV = process.env.NODE_ENV || 'development'

if (NODE_ENV != 'production') {
    _transports.push(
        new transports.Console({
            level: process.env.LOG_LEVEL || 'debug',
        })
    )
}
else {
    _transports.push(
        new transports.File({
            maxFiles: 5,
            maxsize: 5120000,
            filename: `${__dirname}/../logs/log-api.log`,
        })
    )
}

module.exports = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: _transports,
    format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp(),
        format.printf(i => `${i.timestamp} : ${i.level} : ${i.message}`)
    )
})
