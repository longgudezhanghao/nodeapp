var express = require('express');
var router = express.Router();
var db =  require('./db.js');

router.get('/', function(req, res, next) {
    var name = req.query.name;
    var password = req.query.password;

    var addSQL = "insert into user(name,password) values('"+name+"','"+password+"')";

    db.query(addSQL,function (err,rs) {
        if (err) throw err;
        console.log(rs);
        res.render('index');
    })
});

module.exports = router;