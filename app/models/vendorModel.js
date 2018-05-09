var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ElectionResultSchema = new mongoose.Schema(
{
      commodityName:String,
      quantity:String,
      cost:Number,
      vendorName:String,
      vendorLocation:String,
      vendorAddress:String,
      dateOfPurchase:Date,
      units:String,
    dateInMillisecond:Number

},
{collection:"vendorDetails"});
mongoose.model('vendorDetails',ElectionResultSchema);