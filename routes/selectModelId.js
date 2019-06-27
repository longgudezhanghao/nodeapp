var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.get('/',function (req, res, next) {
    var id = req.session.userId;

    var selectModelIdSql = "select modelId , data from model where userId ='" + id +"'";

    db.query(selectModelIdSql,function (err,rs) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }

        console.log('......');
        rs = JSON.stringify(rs);//把results对象转为字符串，去掉RowDataPacket
        rs = JSON.parse(rs);//把被转化成字符串的rs装化成json格式
        res.json(rs);
    });
});

module.exports = router;