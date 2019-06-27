var express = require('express');
var router = express.Router();
var db =  require('./db.js');

router.get('/', function(req, res, next) {
    var name = req.query.name;
    var password = req.query.password;

    var selectSQL = "select * from user where name = '" + name +
    "' and password = '" + password + "'";
    db.query(selectSQL,function (err,rs) {
        if (err) throw err;
        console.log(rs);
        res.render('train');
    })
});

module.exports = router;