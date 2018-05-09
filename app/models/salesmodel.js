var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var salesSchema = new mongoose.Schema(
    {
    numberOfCoconut:Number,
    numberOfBatches:Number,
        timeInMilliSecond:Number,
    dateOfAddition:Date,
        product:{},
    },
    {collection:"salesDetails"});
mongoose.model('salesDetails',salesSchema);
