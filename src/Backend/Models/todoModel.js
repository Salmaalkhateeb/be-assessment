const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const todoModel = new schema({
    id : Number,
    userID : Number,
    info : String,
    date : Date

});

//should auto increment using mongoose-sequence module
todoModel.plugin(AutoIncrement,  {id: 'todo_counterNew', inc_field: 'id'});

module.exports = mongoose.model('todoModel', todoModel);