const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userModel = new schema({
    id : Number,
    password: String,
    email: {
        type: String,
        unique: true,
      },
    verificationToken: String,
    isVerified: {
        type: Boolean,
        default: false,
      }


});

//should auto increment using mongoose-sequence module
userModel.plugin(AutoIncrement,  {id: 'user_counterNew', inc_field: 'id'});

module.exports = mongoose.model('userModel', userModel);