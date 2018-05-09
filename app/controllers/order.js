var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    OrderModel = mongoose.model('orders');

    module.exports = function (app){
        app.use('/', router);
    };


router.post('/orderSetting', function(req, res, next) {
    var orderModel = new OrderModel(req.body);
    console.log('body:',req.body);
    orderModel.save(function(err, result) {
        if (err){
            console.log('orderSetting failed: ' + err);
        }
        console.log('kit',result);
        res.send(result);
    });
});

router.get('/allOrderSetting', function(req, res, next) {
OrderModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))

})

router.get('/customerBymongoId/:customerMongoId',function(req,res,next){

OrderModel.find({"customerId":req.params.customerMongoId},function(err,result){
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

router.get('/orderBymongoId/:orderMongoId',function(req,res,next){

        OrderModel.findOne({"_id":req.params.orderMongoId},function(err,result){
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

router.post('/getQueryPaymentDetails',function(req,res,next){
//        var customerId = req.params.customerId;

//        console.log('customerId', req.params.queryMongoId);
        OrderModel.aggregate([
            {$project: {customerId:1,total:1} },
            {$match: {'customerId':customerId, dateOfPurchase: {$gte:req.body.params.startDate, $lte:req.body.params.endDate}  } },
            {$group: { _id:null, totalCost:{$sum:'$total'} } }
         ], function(err, result){
          console.log(req.body.params.startDate);
          console.log(req.body.params.endDate);
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            res.send(result);
         });
});

router.post('/querySetting', function(req, res, next) {
    var orderModel = new OrderModel(req.body);
    console.log('body:',req.body);
    orderModel.save(function(err, result) {
        if (err){
            console.log('orderSetting failed: ' + err);
        }
        console.log('kit',result);
        res.send(result);
    });
});



router.post('/updateBalanceByOrderId', function(req, res, next) {
    OrderModel.find({"_id":req.body.orderDetails._id},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
/*            console.log("*************.balanceAmount****************")
            console.log(result[0].balanceAmount);
            console.log(parseInt(req.body.balancePaid));
            console.log(result[0].balanceAmount-parseInt(req.body.balancePaid))
            console.log("*************.balanceAmount****************")*/
            var obj={}
            obj.cost=result[0].cost
            obj.dateOfPurchase=result[0].dateOfPurchase
            obj.amountPaid=parseInt(req.body.balancePaid)
            obj.packageCost=result[0].packageCost
            obj.total=result[0].total
            obj.balanceAmount=(result[0].balanceAmount-parseInt(req.body.balancePaid))
            obj.customerId=result[0].customerId
            obj.dateOfUpdate=new Date()
            console.log("*************cefrore svaeeeeeeeeee****************")
            console.log( obj)
            OrderModel.findOneAndUpdate({"_id":req.body.orderDetails._id},obj,{upsert: true},
                function(err,result)
                {
                    if(err){
                        console.log(err.stack)
                    }else{
                        res.send(result)
                    }

                });

        }


    })


});


router.delete('/orderSubCost/:id',function(req, res, next){
    OrderModel.remove({"_id":req.params.id},function(err,result)
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
