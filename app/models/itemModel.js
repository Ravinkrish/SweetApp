var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ElectionResultSchema = new mongoose.Schema(
{
      numberOfCoconut:Number,
      numberOfBatches:Number,
      dateOfAddition:Date,
      name:String,
      noOfTrays:Number,
      noOfPackets:Number,
      ItemCost:Number,
      ItemTotalCost:Number

},
{collection:"itemDetails"});
mongoose.model('itemDetails',ElectionResultSchema);
