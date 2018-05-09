var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    AdvanceModel = mongoose.model('advance');

    module.exports = function (app){
        app.use('/', router);
    };


router.post('/advancePosting', function(req, res, next) {
    var advanceModel = new AdvanceModel(req.body);
    advanceModel.save(function(err, result) {
        if (err){
            console.log('advancePosting failed: ' + err);
        }
        res.send(result);
    });
});

router.get('/AllAdvanceDetails', function(req, res, next) {
AdvanceModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))

})

router.get('/advanceBymongoId/:advanceMongoId',function(req,res,next){
console.log('advanceMongoId', req.params.advanceMongoId);
AdvanceModel.findOne({"_id":req.params.advanceMongoId},function(err,result){
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

router.post('/editAdvanceBymongoId', function(req, res, next) {
        console.log("******", req.body)
        console.log(req.body._id);
            AdvanceModel.findOneAndUpdate({"_id":req.body._id},req.body,{upsert: true, new: true},
            function(err,result)
                {
                    if(err){
                        console.log(err.stack)
                    }else{
                        res.send(result)
                    }

                });

})

router.delete('/advanceBymongoId/:advanceMongoId',function(req, res, next){
console.log('advanceMongoId', req.params.advanceMongoId);
AdvanceModel.remove({"_id":req.params.advanceMongoId},function(err,result)
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


router.get('/getMonthlysalaryBYEmpID/:empID',function(req, res, next){
console.log('advanceMongoId', req.params.empID);
AdvanceModel.find({"employeeId":req.params.empID},function(err,result)
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



router.get('/getAdvancePayments/:empId',function(req,res,next){
        var employeeId = req.params.empId;
        console.log('EmpId', req.params.empId);
        AdvanceModel.aggregate([
            { $project: {employeeId:1, dateOfAdvance:1, name:1,salaryPerMonth:1, salaryInAdvance:1, month:{$month: '$dateOfAdvance'} } },
            {$match: {'employeeId':employeeId} },
            {$group: { _id:"$month", data: { $push: "$$ROOT" }, total:{$sum:'$salaryInAdvance'} } }
         ], function(err, result){
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            res.send(result);
         });
});


//for(var j=0;j<delta.length;j++){
//     var advances = {};
//     var month= new date(dekta[j].dateOfAdvance)
//      month.getMonth();
//
//    if(advances[month]){
//      advances[month] = [];
//    }
//
//  advances[month].push()
//
//}
