const winston = require('winston');
require('winston-mongodb');

//Wraps all express routes in try-catch blocks for unhandled promise errors so that the error middleware gets called.
require('express-async-errors');

module.exports = function () {
  //For uncaught exceptions that do not get automatically displayed.
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  //Logging unhandled promise rejections.
  process.on('unhandledRejection', (ex, promise) => {
    throw (ex, promise);
  });

  //Creating a logfile.
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));

  //DB logging.
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  winston.add(
    new winston.transports.MongoDB({
      db: process.env.DB_URL,
      level: 'error',
      options: options,
    })
  );

  //Log onto the console
  winston.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
};
