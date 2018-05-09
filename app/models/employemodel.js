var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ElectionResultSchema = new mongoose.Schema(
{
       employeeId:String,
       name:String,
       dateOfbirth:String,
       address:String,
       city:String,
       postalCode:String,
       mobileNumber:Number,
       alternateNumber:Number,
       dateOfJoining:Date,
       monthlySalary:Number,
       salaryInAdvance:Number,
       employeePhoto:String,
       annualAdvance:Number,
       dateOfAnnual:Date

},
{collection:"employeeDetails"});
mongoose.model('employeeDetails',ElectionResultSchema);