var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ElectionResultSchema = new mongoose.Schema(
{
      customerId:String,
      costOfBig:Number,
      costOfSmall:Number,
      costOfLaddu:Number,
      rupees:Number,
      packetsOfBig:Number,
      packetsOfSmall:Number,
      packetsOfLaddu:Number,
      packetsInRupees:Number,
      otherstates:String,
      packageCost:Number,
      dateOfPurchase:Date,
      dateOfUpdate:Date,
      total:Number,
      amountPaid:Number,
      balanceAmount:Number,
      cost:{}
},
{collection:"orders"});
mongoose.model('orders',ElectionResultSchema);