var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ElectionResultSchema = new mongoose.Schema(
{
      firstName:String,
      lastName:String,
      userName:String,
      password:String
},
{collection:"user"});
mongoose.model('user',ElectionResultSchema);
