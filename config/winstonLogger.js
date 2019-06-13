const winston = require('winston');
const appRoot = require('app-root-path');


const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp}, ${info.message}`),
)

var winstonLogger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: `${appRoot}/logs/app.log`,
      level: 'info'
    }),
    new winston.transports.Console({
      level: 'info'
    })
  ],
  exitOnError: false, // do not exit on handled exceptions
});

winstonLogger.stream = {
  write: function(message, encoding) {
    winstonLogger.info(message);
  },
};

module.exports = winstonLogger;