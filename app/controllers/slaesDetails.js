var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    salesModel = mongoose.model('salesDetails');

module.exports = function (app){
    app.use('/', router);
};



router.post('/salesDetails', function(req, res, next) {
    console.log("req.bodyreq.bodyreq.body8234728748273482347")
    console.log(req.body)
    var salesDetails = new salesModel(req.body);
    salesDetails.numberOfCoconut=req.body.numberOfCoconut
    salesDetails.numberOfBatches=req.body.numberOfBatches
    salesDetails.dateOfAddition=req.body.dateOfAddition
    salesDetails.product=req.body.product
    salesDetails.save(function(err, result) {
        if (err){
            console.log('salesModel failed: ' + err);
        }
        res.send(result);
    });
});


router.get('/salesDetails', function(req, res, next) {
    salesModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }
    });
})


router.delete('/salesDetails/:mongoId',function(req, res, next){
    console.log('userMongoId', req.params.mongoId);
    salesModel.remove({"_id":req.params.mongoId},function(err,result)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result)
        }

    });
});


router.post('/saveItemSalesDetails', function(req, res, next) {
    console.log("**saveItemSalesDetailssaveItemSalesDetailssaveItemSalesDetails****")
    console.log(req.body.details)
    salesModel.update(
        {"_id":req.body.mongoDbId},
        {$set: {
            "numberOfCoconut" : req.body.details.dateOfAddition,
            "numberOfBatches" : req.body.details.numberOfBatches,
            "dateOfAddition" :parseInt(req.body.details.numberOfCoconut),
            "Items" : req.body.details.Items
        }},function(err,result)
        {
            if(err){
                console.log(err.stack)
            }
            else{
                res.send(result)
            }

        });



})


router.get('/queryDailyProductionDetails/:fromDate/:toDate',function(req,res,next){
    salesModel.aggregate({ $match: {
            $or: [
                {timeInMilliSecond: {$gte:parseInt(req.params.fromDate)}},
                {timeInMilliSecond: {$lte: parseInt(req.params.toDate)}},
            ]
        } }, function(err, result){
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            res.send(result);
        });
});


router.get('/salesDetails/:salesId',function(req,res,next){
    salesModel.findOne({"_id":req.params.salesId},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send(result);

        }


    })

});








