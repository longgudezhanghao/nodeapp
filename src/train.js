var express = require('express');
var router = express.Router();
var fs = require("fs");
const db = require('./db');

router.post('/', function (req, res) {

    var  modelJsonUrl = '';

    var weightUrl = '';

    var modelId = req.body.modelId;

    var selectSQL = "select modelJsonUrl , weightUrl from model where modelId ='" + modelId + "'";

    //选择出来的结果唯一，ｍｏｄｅｌＩｄ是主键
    db.query(selectSQL,function (err,rs) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }

        rs = JSON.stringify(rs);//把results对象转为字符串，去掉RowDataPacket
        rs = JSON.parse(rs);//把被转化成字符串的rs装化成json格式
        modelJsonUrl = rs[0]['modelJsonUrl'];
        weightUrl = rs[0]['weightUrl'];
        console.log("get"+" "+weightUrl+" "+"and"+" "+modelJsonUrl);

    })

    console.log(req.files[0]);  // 上传的文件信息

    var des_file = "/home/dengzhihui/WebstormProjects/nodeapp/public/images" + "/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
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
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });

});


module.exports = router;