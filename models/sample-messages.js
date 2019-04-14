const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	sid:String,
    message_type:String,
    message:String,
    source:String,
    parentId:String

});

module.exports = mongoose.model('Message', messageSchema);

