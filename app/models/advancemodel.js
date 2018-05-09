var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ElectionResultSchema = new mongoose.Schema(
{
      employeeId:String,
      employeeName:String,
      monthlySalary:Number,
      salaryInAdvance:Number,
      dateOfAdvance:Date,
      salaryPerMonth:Number

},
{collection:"advance"});
mongoose.model('advance',ElectionResultSchema);
