var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    UserModel = mongoose.model('user');

    module.exports = function (app){
        app.use('/', router);
    };


var saveImageAsFile = function(data, fileName){
    var base64Data = data.replace(/^data:image\/jpeg;base64,/, "");
    require("fs").writeFile("public/photos/" + fileName + ".jpg", base64Data, {encoding: 'base64'}, function(err) {
        if(err){
            console.log("photo save failed: ", err);
            return;
        }
        console.log('File created');
        return;
    });
};


router.post('/userRegistration', function(req, res, next) {
//saveImageAsFile(req.body.photo, req.body.userName);
//var user = req.body;
//user.photo = req.body.userName + ".jpg";
    //var userModel = new UserModel(user);
    console.log("hyqiuyiwqq",req.body);
    UserModel.findOneAndUpdate({}, req.body, {upsert: true, new:true},function(err,result){
        console.log("hyqiuyiwqq",req.body);
                if(err){
                    console.log(err.stack)
                }else{
                    res.send(result)
                }

            });
});

router.post('/login', function(req, res, next) {
   console.log(">>>>", req.body);
   if( req.body && req.body.userName && req.body.password){
       var userName = req.body.userName;
       var password =  req.body.password;
       UserModel.findOne({userName:userName},  function(err, result) {
           if (err){
               res.send({loginStatus: false});
           }
           res.send({loginStatus: "invalid user details"});
       });
   }
   else{
       res.send({loginStatus: "invalid user details"});
   }

});

router.get('/userBymongoId/:userMongoId',function(req,res,next){
console.log('userMongoId', req.params.userMongoId);
UserModel.findOne({"_id":req.params.userMongoId},function(err,result){
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

router.get('/AllProfiletDetails', function(req, res, next) {
UserModel.findOne({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }
    });
})

router.delete('/userBymongoId/:userMongoId',function(req, res, next){
console.log('userMongoId', req.params.userMongoId);
UserModel.remove({"_id":req.params.userMongoId},function(err,result)
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


router.post('/editProfileBymongoId', function(req, res, next) {
        console.log("******", req.body)
        console.log(req.body._id);
            UserModel.findOneAndUpdate({"_id":req.body._id},req.body,{upsert: true, new: true},
            function(err,result)
                {
                    if(err){
                        console.log(err.stack)
                    }else{
                        res.send(result)
                    }

                });

})


router.post('/personalPhoto', function(req, res, next) {
    UserModel.findOneAndUpdate({"_id":req.body.id},
        {humanPhoto: req.body.humanPhoto},{upsert: true, new: false},
        function(err,result)
        {
            if(err){
                console.log(err.stack)
            }else{
                res.send(result)
            }

        });
})




