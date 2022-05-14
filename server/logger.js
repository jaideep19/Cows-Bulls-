const { format } = require('winston');

const {
  timestamp, combine, printf, errors,
} = format;
const myFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: [${message}]`);

const winston = require('winston');

// const now = new Date();
const logger = winston.createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //   errors({ stack: true }),
    myFormat,
  ),

  transports: [

    new winston.transports.File({
      name: 'error-logs',
      filename: 'errors.log',
      level: 'error',
      json: false,
    }),

    new winston.transports.File({
      name: 'info-logs',
      filename: 'info.log',
      level: 'info',
      json: false,
    }),
  ],

  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write(message, encoding) {
    logger.info(message);
    console.log('message=', message);
  },
};
