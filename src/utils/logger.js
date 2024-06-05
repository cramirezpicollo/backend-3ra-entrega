const winston = require ("winston");

const logger = winston.createLogger ({
    transports: [
        new winston.transports.Console ({level: "debug"}),
        new winston.transports.File ({
            filename: "./errors.log",
            level: "info"
        })
    ]
})

const addLogger = (req,res,next) =>{
    req.logger = logger;
    req.logger.debug(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
}

module.exports = addLogger;

