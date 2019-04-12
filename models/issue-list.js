const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
	sid:String,
	issue_num:Number,
	status:String,
	logdata:String,
	system:String,
	issue:String,
	status_update:String,
	owner:String,
	case_num:String,
	priority:String,
	resolve_date:Date,
	parentId:String
    
});

module.exports = mongoose.model('IssueList', issueSchema);

