const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const technicalSchema = new Schema({
	sid:String,
	SystemType:String, 
	ApplicationRole:String,
	ApplicationName:String,
	Version:String,
	Ip:String,
	HostName:String,
	UserName:String,
	Password:String,
	Remark:String,
	parentId:String
    
});

module.exports = mongoose.model('TechnicalDetails', technicalSchema);


