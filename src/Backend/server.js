const express = require('express');
const app = express();
require('dotenv').config();
const winston = require('winston'); //To display information in the logfile instead of the console.



require('./Startup/logging')();
require('./Startup/routes')(app);
require('./Startup/database')();


app.get("/", (req, res) => {
  res.send("Health Check!")
})

app.listen(process.env.PORT, () => {
  winston.info(`server running on ${process.env.PORT}`);
});
