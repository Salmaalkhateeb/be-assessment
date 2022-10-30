const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
  const connParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  mongoose.set('useUnifiedTopology', true);
  mongoose
    .connect(process.env.DB_URL, connParams)
    .then(() => {
      winston.info('Connected to the Database successfully');
    })
    .catch((err) => {
      winston.error(`Failed to connect to the Database: ${err.message}`);
    });
};
