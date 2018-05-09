var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ElectionResultSchema = new mongoose.Schema(
{
      employeeId:String,
      employeeName:String,
      startDate:Date,
      endDate:Date,
      noOfDays:Number,
      reasonForLeave:String
},
{collection:"leaveDetails"});
mongoose.model('leaveDetails',ElectionResultSchema);