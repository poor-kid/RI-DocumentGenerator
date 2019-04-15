const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Testplan_DmwlSchema = new Schema({
	test_type:String,
	sid:String,
	test:String,
	test_des:String,
	expctd_result:String,
	status:String,
	notes:String,
	parentId:String
    
});

module.exports = mongoose.model('Testplan_Dmwl', Testplan_DmwlSchema);

