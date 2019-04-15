const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MappingSchema = new Schema({
	sid:String,
	field1:String,
	field2:String,
	field3:String,
	field4:String,
	mappings_type:String,
	parentId:String,
	//contains:String
    
});

module.exports = mongoose.model('mappings_autocreate',MappingSchema );