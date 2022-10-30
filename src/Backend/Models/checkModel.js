const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const checkModel = new schema({
    id : Number,
    user: Number,
    name: String,
    url: Stirng,
    protocol: {
        type: String,
        enum: ["HTTP", "HTTPS", "TCP"],
      },
      path: {
        type: String,
        default: "/",
      },
      port: Number,
      webhook: String,
      timeout: {
        type: Number,
        default: 5,
      },
      interval: {
        type: Number,
        default: 10000,
      },
      threshold: {
        type: Number,
        default: 1,
      },
      authentication: {
          username: String,
          password: String,
      },
      httpHeaders: [{
        key: String,
        value : String,
      }],
      assert: {
        statusCode: Number,    
      },
      tags: [String],
      ignoreSSL: {
        type: Boolean,
        required: true,
      }


});

//should auto increment using mongoose-sequence module
checkModel.plugin(AutoIncrement,  {id: 'check_counterNew', inc_field: 'id'});

module.exports = mongoose.model('checkModel', checkModel);