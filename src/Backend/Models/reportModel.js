const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const reportModel = new schema({
    id : Number,
    user: Number,
    check: Number,
    status: {
        type: String,
        required: true,
      },
    availability: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
    outages: {
        type: Number,
        required: true,
        default: 0,
      },
    downTimeInSeconds: {
        type: Number,
        required: true,
        min: 0,
      },
    upTimeInSeconds: {
        type: Number,
        required: true,
        min: 0,
      },
    responseTime: {
        type: Number,
        required: true,
        min: 0,
      },
      history: [Date],
    });

//should auto increment using mongoose-sequence module
reportModel.plugin(AutoIncrement,  {id: 'report_counterNew', inc_field: 'id'});

module.exports = mongoose.model('reportModel', reportModel);