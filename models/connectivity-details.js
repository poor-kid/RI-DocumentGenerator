const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectivitySchema = new Schema({
	sid:String,
	conn_type:String,
	servertype:String,
	system:String,
	interfacetype:String,
	msg_evnt: String,
	interface_dir:String,
	source:String,
	source_ip:String,
	destination:String,
	destination_ip:String,
	port:String,
	AE_title:String,
	parentId:String,
	interface_route:String,
	map_name:String
});

module.exports = mongoose.model('Connectivity', connectivitySchema);

