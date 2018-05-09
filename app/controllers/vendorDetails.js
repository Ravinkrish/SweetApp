var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    VendorModel = mongoose.model('vendorDetails');

    module.exports = function (app){
        app.use('/', router);
    };


router.post('/vendorDetails', function(req, res, next) {
console.log('kikikikiki',req.body)
    var vendorModel = new VendorModel(req.body);
    vendorModel.save(function(err, result) {
        if (err){
            console.log('vendorDetailspost failed: ' + err);
        }
        res.send(result);
    });
});


router.get('/allVendorDetails', function(req, res, next) {
    VendorModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))

})


router.delete('/vendorBymongoId/:vendorMongoId',function(req, res, next){
        console.log('vendorMongoId', req.params.vendorMongoId);
            VendorModel.remove({"_id":req.params.vendorMongoId},function(err,result)
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


router.get('/vendorByName/:vendorMongoId',function(req,res,next){
        console.log('vendorMongoId', req.params.vendorMongoId);
        VendorModel.findOne({"vendorName":req.params.vendorMongoId},function(err,result){
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

router.get('/getVendorDetails/:name',function(req,res,next){
    var vendorName = req.params.name;
    console.log('name', req.params.name);
    VendorModel.aggregate([
        { $project: {vendorName:1, commodityName:1, quantity:1, cost:1, dateOfPurchase:1, month:{$month: '$dateOfPurchase'} } },
        {$match: {'vendorName':vendorName} },
        {$group: { _id:"$month", data: { $push: "$$ROOT" } } }
    ], function(err, result){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        res.send(result);
    });
});

router.get('/getVendorDetailsBasedOnDate/:fromDate/:toDate',function(req,res,next){

    console.log(  req.params.fromDate);
    console.log(req.params.toDate);

    VendorModel.aggregate({ $match: {
            $or: [
                {dateInMillisecond: {$gte:parseInt(req.params.fromDate)}},
                {dateInMillisecond: {$lte: parseInt(req.params.toDate)}},
            ]
        } },
        { $group: { _id : null, sum : { $sum: "$cost" } } }, function(err, result){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        res.send(result);
    });
});

router.get('/getVendorDetailsListBasedOnDate/:fromDate/:toDate',function(req,res,next){

    console.log(  req.params.fromDate);
    console.log(req.params.toDate);

    VendorModel.aggregate({ $match: {
            $or: [
                {dateInMillisecond: {$gte:parseInt(req.params.fromDate)}},
                {dateInMillisecond: {$lte: parseInt(req.params.toDate)}},
            ]
        } }, function(err, result){
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            res.send(result);
        });
});



function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    hours  = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    seconds = ("0" + date.getSeconds()).slice(-2);
    var inter=[ date.getFullYear(), mnth, day].join("-")
    inter=inter+'T'
    var interTime=[hours, minutes ,seconds].join(":")
    return inter+interTime;
}



