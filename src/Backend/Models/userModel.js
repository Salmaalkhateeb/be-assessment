const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userModel = new schema({
    id : Number,
    password: String,
    name : String

});

//should auto increment using mongoose-sequence module
userModel.plugin(AutoIncrement,  {id: 'user_counterNew', inc_field: 'id'});

module.exports = mongoose.model('userModel', userModel);