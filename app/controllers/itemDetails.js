var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    ItemModel = mongoose.model('itemDetails');

    module.exports = function (app){
        app.use('/', router);
    };


router.post('/itemDetailPosting', function(req, res, next) {
    var itemModel = new ItemModel(req.body);
    itemModel.save(function(err, result) {
        if (err){
            console.log('itemDetailPosting failed: ' + err);
        }
        res.send(result);
    });
});

router.get('/allItemDetails', function(req, res, next) {
ItemModel.find({},function(err,result){
        if(err){
            res.send(err)
            console.log(err.stack)
        }else{
            res.send(result)
        }

    }).skip(parseInt(req.params.start)).limit(parseInt(req.params.range))

})