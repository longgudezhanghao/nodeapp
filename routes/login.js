var express = require('express');
var router = express.Router();
var db =  require('./db.js');

router.get('/', function(req, res, next) {
    var name = req.query.name;
    var password = req.query.password;

    var selectSQL = "select * from user where name = '" + name +
    "' and password = '" + password + "'";
    db.query(selectSQL,function (err,rs) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }

        rs = JSON.stringify(rs);//把results对象转为字符串，去掉RowDataPacket
        rs = JSON.parse(rs);//把被转化成字符串的rs装化成json格式
        const id = rs[0]['id'];
        console.log(id);

        var sess = req.session;
        console.log(sess);
        sess.userId = id;

        res.render('train');

    })
});

module.exports = router;