const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StringFieldInputSchema = new Schema({
	contains:String
});

module.exports = mongoose.model('StringFieldInput', StringFieldInputSchema);

