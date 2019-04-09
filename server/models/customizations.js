const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const custamizationSchema = new Schema({
	sid:String,
    description:String,
    details:String,
    solution:String,
    screenshot:String,
    remark:String
});

module.exports = mongoose.model('Custamization', custamizationSchema);

