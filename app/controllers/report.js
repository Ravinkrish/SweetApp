var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    ReportModel = mongoose.model('reports');

    module.exports = function (app){
        app.use('/', router);
    };


router.post('/reportSetting', function(req, res, next) {
    var reportModel = new ReportModel(req.body);

    reportModel.save(function(err, result) {
        if (err){
            console.log('adminSetting failed: ' + err);
        }
        res.send(result);
    });
});

router.get('/allReportSetting', function(req, res, next) {
ReportModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))

})

router.get('/reportBymongoId/:reportMongoId',function(req,res,next){
console.log('reportMongoId', req.params.reportMongoId);
ReportModel.findOne({"_id":req.params.reportMongoId},function(err,result){
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

router.post('/editReportBymongoId', function(req, res, next) {
        console.log("******", req.body)
        console.log(req.body._id);
            ReportModel.findOneAndUpdate({"_id":req.body._id},req.body,{upsert: true, new: true},
            function(err,result)
                {
                    if(err){
                        console.log(err.stack)
                    }else{
                        res.send(result)
                    }

                });

})

router.delete('/reportBymongoId/:reportBymongoId',function(req, res, next){
console.log('reportBymongoId', req.params.reportBymongoId);
ReportModel.remove({"_id":req.params.reportBymongoId},function(err,result)
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



