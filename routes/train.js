var express = require('express');
var router = express.Router();
var fs = require("fs");

router.post('/', function (req, res) {

    console.log(req.files[0]);  // 上传的文件信息

    var des_file = "/home/dengzhihui/WebstormProjects/nodeapp/public/images" + "/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            let response;
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });


})

module.exports = router;