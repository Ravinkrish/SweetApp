var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    EmployeeModel = mongoose.model('employeeDetails');
    LeaveModel = mongoose.model('leaveDetails');
    AdvanceModel = mongoose.model('advance');


    module.exports = function (app){
        app.use('/', router);
    };

var _MS_PER_DAY = 1000 * 60 * 60 * 24;
var dateDiffInDays = function (a, b) {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return (Math.floor((utc2 - utc1) / _MS_PER_DAY)) + 1;
}

router.post('/leaveDetails', function(req, res, next) {
    // how to subtract dates
    var startDate =  new Date(req.body.startDate);
    var endDate =  new Date(req.body.endDate);
    req.body.noOfDays = dateDiffInDays(startDate, endDate);
    var leaveModel = new LeaveModel(req.body);
        leaveModel.save(function(err, result) {
            if (err){
                console.log('leavedetailspost failed: ' + err);
            }
            res.send(result);
        });
});

var getMonthlySalary = function(employeeId, callback){
    EmployeeModel.findOne({employeeId:employeeId}, {monthlySalary:1, salaryInAdvance:1}, function(err, emp){
        if(err){
            return callback("No record found");
        }
        if(!err && !emp.monthlySalary){
            return callback("No salary data found");
        }
        return callback(null, emp);
    });
};

var getTotalLeaves =  function(employeeId, salaryMonth, callback){
    LeaveModel.aggregate([
            { $project: {employeeId:1, noOfDays:1, month:{$month: '$startDate'} } },
            {$match: {month:salaryMonth, 'employeeId':employeeId} },
            {$group: { _id:null, total:{$sum:'$noOfDays'} } }
        ], function(err, result){
            if(err){
                return callback("System error. service failed");
            }
            else{
                return callback(null, result[0].total);
            }
        });
};

var getLeavesPerMonth =  function(employeeId, callback){
    LeaveModel.aggregate([
            { $project: {employeeId:1, noOfDays:1, startDate:1, endDate:1,reasonForLeave:1, month:{$month: '$startDate'} } },
            {$match: {'employeeId':employeeId} },
            {$group: { _id:'$month', totalDays:{$sum:'$noOfDays'}, data:{ $push: "$$ROOT"} } }
        ], function(err, result){
            if(err){
                return callback("System error. service failed");
            }
            else{
                return callback(null, result);
            }
        });
};

var getAdvancePayments = function(employeeId, salaryMonth, callback){

};

router.get('/getSalary/:employeeId', function(req, res, next){
    var employeeId = req.params.employeeId;
    getLeavesPerMonth(employeeId, function(err, result){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }
        res.send(result);
    });
//Get monthly salary
//    getMonthlySalary(employeeId, function(err, empDetail){
//        if(err){
//            console.log("Service Failed: level 1", err);
//            res.status(500).send(err);
//        }
//        // get total leaves taken
//        getTotalLeaves(employeeId, salaryMonth, function(err, totalLeaveTaken){
//            if(err){
//                console.log("Service Failed: level 2", err);
//                res.status(500).send(err);
//            }
//            // calculate the payment
//            var salary = empDetail.monthlySalary;
//            console.log('kokokokko',salary);
//            //var advanceSalary = empDetail.salaryInAdvance;
//            console.log('123',advanceSalary);
//            var salaryPerDay = salary/30;
//            console.log('456',salaryPerDay);
//            var salaryDeduction = salaryPerDay * totalLeaveTaken;
//            console.log('789',salaryDeduction);
//            var payment = Math.floor(salary - salaryDeduction - advanceSalary);
//            console.log('098',payment);
//            res.send({payment: payment});
//
//        });
//    });
});

router.get('/allLeaveDetails', function(req, res, next) {
        LeaveModel.find({},function(err,result){
                if(err){
                    res.send(err)
                    console.log(err.stack)
                }else{
                    res.send(result)
                }

                }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))

        })


router.get('/leaveBymongoId/:leaveMongoId',function(req,res,next){
        console.log('leaveMongoId', req.params.leaveMongoId);
        LeaveModel.findOne({"_id":req.params.leaveMongoId},function(err,result){
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

router.post('/editLeaveBymongoId', function(req, res, next) {
        console.log("******", req.body)
        console.log(req.body._id);
        console.log('leaveMongoId', req.params.leaveMongoId);
        LeaveModel.findOneAndUpdate({"_id":req.body._id},req.body,{upsert: true, new: true},
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


router.delete('/leaveBymongoId/:leaveMongoId',function(req, res, next){
        console.log('leaveMongoId', req.params.leaveMongoId);
            LeaveModel.remove({"_id":req.params.leaveMongoId},function(err,result)
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




//router.get('/getLeavePayments/:empId',function(req,res,next){
//        var employeeId = req.params.empId;
//        console.log('EmpId', req.params.empId);
//        LeaveModel.aggregate([
//                    { $project: {employeeId:1, noOfDays:1, month:{$month: '$startDate'} } },
//                    {$match: {month:salaryMonth, 'employeeId':employeeId} },
//                    {$group: { _id:null, total:{$sum:'$noOfDays'} } }
//                ], function(err, result){
//            if(err){
//                console.log(err);
//                res.status(500).send(err);
//            }
//            res.send(result);
//         });
//});


//router.get('/leavedetailsperdayBymongoId/:leavedetailsperdayMongoId',function(req,res,next){
//        console.log('leavedetailsperdayMongoId', req.params.leavedetailsperdayMongoId);
//         LeaveModel.find({ timestamp: { $gte:ISODate("2013-11-19T14:00:00Z"), $lt: ISODate("2013-11-19T20:00:00Z") } })


