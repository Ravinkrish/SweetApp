var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    AnalysisModel = mongoose.model('analysis');

    module.exports = function (app){
        app.use('/', router);
    };


router.post('/queryPosting', function(req, res, next) {
    var analysisModel = new AnalysisModel(req.body);
    analysisModel.save(function(err, result) {
        if (err){
            console.log('Queryposting failed: ' + err);
        }
        res.send(result);
    });
});

router.get('/AllQueryDetails', function(req, res, next) {
AnalysisModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))

})

router.get('/analysisBymongoId/:analysisMongoId',function(req,res,next){
console.log('analysisMongoId', req.params.analysisMongoId);
AnalysisModel.findOne({"_id":req.params.analysisMongoId},function(err,result){
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

router.post('/editQueryBymongoId', function(req, res, next) {
        console.log("******", req.body)
        console.log(req.body._id);
            AnalysisModel.findOneAndUpdate({"_id":req.body._id},req.body,{upsert: true, new: true},
            function(err,result)
                {
                    if(err){
                        console.log(err.stack)
                    }else{
                        res.send(result)
                    }

                });

})

router.delete('/analysisBymongoId/:analysisMongoId',function(req, res, next){
console.log('analysisMongoId', req.params.analysisMongoId);
AnalysisModel.remove({"_id":req.params.analysisMongoId},function(err,result)
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



