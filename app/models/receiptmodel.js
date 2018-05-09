var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ElectionResultSchema = new mongoose.Schema(
{
  receiptName:String,
  date:Date,
  description:String,
  docUpload:String
},
{collection:"receiptsDetails"});
mongoose.model('receiptsDetails',ElectionResultSchema);
