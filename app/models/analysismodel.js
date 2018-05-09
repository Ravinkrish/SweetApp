var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ElectionResultSchema = new mongoose.Schema(
{
      Name:String,
      Age:String,
      Startdate:String,
      Enddate:String

},
{collection:"analysis"});
mongoose.model('analysis',ElectionResultSchema);
