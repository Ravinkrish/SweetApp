var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ElectionResultSchema = new mongoose.Schema(
{
      productName:String,
      productDescription:String,
      costPerProduct:Number
},
{collection:"productDetails"});
mongoose.model('productDetails',ElectionResultSchema);