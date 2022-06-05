const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return {
    timestamp: timestamp,
    level: level,
    message: message,
  };
});

let logger = null;

if (process.env.NODE_ENV === 'production') {
  logger = createLogger({
    level: 'silly',
    format: combine(timestamp(), myFormat, prettyPrint()),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'productionError.log',
        level: 'error',
      }),
    ],
  });
} else {
  logger = createLogger({
    level: 'silly',
    format: combine(timestamp(), myFormat, prettyPrint()),
    transports: [new transports.Console()],
  });
}

module.exports = logger;
