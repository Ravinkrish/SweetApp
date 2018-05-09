var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    ReceiptModel = mongoose.model('receiptsDetails');
    module.exports = function (app){
        app.use('/', router);
    };

var saveImageAsFile = function(docUpload, fileName){
    var base64Data = docUpload.replace(/^docUpload:image\/jpeg;base64,/, "");
    require("fs").writeFile("public/photos/" + fileName + ".jpg", base64Data, {encoding: 'base64'}, function(err) {
        if(err){
            console.log("photo save failed: ", err);
            return;
        }
        console.log('File created');
        return;
    });
};
router.post('/setLogo', function(req, res, next) {
var receiptModel=new ReceiptModel(req.body);
    receiptModel.save(function(err,result){
            if(err){
                console.log(err.stack)
            }else{
                res.send(result)
            }

        });
        });
router.post('/receiptDetails', function(req, res, next) {
saveImageAsFile(req.body.docUpload, req.body.receiptName);
var user = req.body;
user.docUpload = req.body.docUpload;
    var receiptModel = new ReceiptModel(req.body);
    receiptModel.save(function(err, result) {
        if (err){
            console.log('receiptDetailspost failed: ' + err);
        }
        res.send(result);
    });
});
router.get('/allReceiptDetails', function(req, res, next) {
    ReceiptModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))

})
router.get('/receiptBymongoId/:receiptMongoId',function(req,res,next){

        ReceiptModel.findOne({"_id":req.params.receiptMongoId},function(err,result){
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
router.post('/editReceiptBymongoId', function(req, res, next) {

        ReceiptModel.findOneAndUpdate({"_id":req.body._id},req.body,{upsert: true, new: true},
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
router.delete('/receiptBymongoId/:receiptMongoId',function(req, res, next){
        console.log('receiptMongoId', req.params.receiptMongoId);
            ReceiptModel.remove({"_id":req.params.receiptMongoId},function(err,result)
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
router.get('/getAlertsForEveryDay', function(req, res, next) {
    ReceiptModel.find({}, {docUpload:0, _id:0},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            var resulantAlertArr=[]
            var currentDate = new Date();
            var currDay = currentDate.getDate();
            for(var j=0;j<result.length;j++){
                var currentLoopDate = new Date(result[j].date);
                console.log(result[j].date)
                if(currDay==currentLoopDate.getDate()){
                    console.log(currentLoopDate.getDate())
                    resulantAlertArr.push(result[j])
                }

            }
            res.send(resulantAlertArr)
        }

    })

})










