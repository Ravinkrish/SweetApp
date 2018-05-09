var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
 formidable = require('formidable');
var grid = require('gridfs-stream');
var fs = require('fs');
var util = require('util');
var path=require('path');
module.exports = function (app){
        app.use('/', router);
    };


router.post('/uploadCompanyLogo', function (req, res) {
//console.log(req.body);
    var fromDetails={}
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/data";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (!err) {
            fromDetails=files
//            console.log('File uploaded :' + files.file.path);


            grid.mongo = mongoose.mongo;
            var conn = mongoose.createConnection('mongodb://127.0.0.1:27017/testFile');

            conn.once('open', function () {

                var gfs = grid(conn.db);
//                console.log(files.file.name);
                var writestream = gfs.createWriteStream({

                    filename: files.file.name

                });
                fs.createReadStream(files.file.path).pipe(writestream);
            });
        }
    });

    form.on('end', function() {
//    console.log("file namein after floder"+fromDetails.file.name)
     var fullname=path.basename(fromDetails.file.path);
//      console.log(fullname);
       res.send(fullname);

    });

});

//app.get('/', function(request, response){
//    response.send(
//            '<form method="post" action="/fileupload" enctype="multipart/form-data">'
//        + '<input type="file" id="file" name="file">'
//        + '<input type="submit" value="submit">'
//        + '</form>'
//    );
//});
//
/*
router.post('/uploadfile',function(req,resp){
 var serverFileData=req.data;
 resp.send("hai i got the file");
});*/
