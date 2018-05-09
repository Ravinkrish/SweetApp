var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    EmployeeModel = mongoose.model('employeeDetails');

    module.exports = function (app){
        app.use('/', router);
    };


router.post('/employeeDetails', function(req, res, next) {
console.log('doiuIUodusuysao',req.body)
    var employeeModel = new EmployeeModel(req.body);
    employeeModel.save(function(err, result) {
        if (err){
            console.log('employeeDetailspost failed: ' + err);
        }
        res.send(result);
    });
});


router.get('/allEmployeeDetails', function(req, res, next) {
    EmployeeModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))

})


router.get('/employeeBymongoId/:employeeMongoId',function(req,res,next){
        console.log('employeeMongoId', req.params.employeeMongoId);
        EmployeeModel.findOne({"employeeId":req.params.employeeMongoId},function(err,result){
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

router.get('/singleemployeeBymongoId/:employeeMongoId',function(req,res,next){
        console.log('employeeMongoId', req.params.employeeMongoId);
        EmployeeModel.findOne({"_id":req.params.employeeMongoId},function(err,result){
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



router.post('/editEmployeeBymongoId', function(req, res, next) {
        console.log("******", req.body)
        console.log(req.body._id);
        console.log('employeeMongoId', req.params.employeeMongoId);
        EmployeeModel.findOneAndUpdate({"_id":req.body._id},req.body,{upsert: true, new: true},
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


router.delete('/employeeBymongoId/:employeeMongoId',function(req, res, next){
        console.log('employeeMongoId', req.params.employeeMongoId);
            EmployeeModel.remove({"_id":req.params.employeeMongoId},function(err,result)
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




