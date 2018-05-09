var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    ProductModel = mongoose.model('productDetails');

    module.exports = function (app){
        app.use('/', router);
    };


router.post('/productDetails', function(req, res, next) {
console.log('doiuIUodusuysao',req.body)
    var productModel = new ProductModel(req.body);
    productModel.save(function(err, result) {
        if (err){
            console.log('productDetailspost failed: ' + err);
        }
        res.send(result);
    });
});


router.get('/allProductDetails', function(req, res, next) {
    ProductModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))

})


//router.get('/productBymongoId/:productMongoId',function(req,res,next){
//        console.log('productMongoId', req.params.productMongoId);
//        ProductModel.findOne({"productName":req.params.productMongoId},function(err,result){
//                      if(err)
//                      {
//                     console.log(err);
//                      }
//                      else
//                      {
//                         console.log(result);
//                         res.send(result);
//
//                      }
//                      })
//
//});

router.get('/ProductBymongoId/:productMongoId',function(req,res,next){
        console.log('productMongoId', req.params.productMongoId);
        ProductModel.findOne({"_id":req.params.productMongoId},function(err,result){
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



router.post('/editProductBymongoId', function(req, res, next) {
        console.log("******", req.body)
        console.log(req.body._id);
        console.log('employeeMongoId', req.params.employeeMongoId);
        ProductModel.findOneAndUpdate({"_id":req.body._id},req.body,{upsert: true, new: true},
        function(err,result)
            {
                if(err){
                    console.log(err.stack)
                }
                else{
                    res.send(result)
                }

            });

})


router.delete('/productBymongoId/:productMongoId',function(req, res, next){
        console.log('productMongoId', req.params.productMongoId);
            ProductModel.remove({"_id":req.params.productMongoId},function(err,result)
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



