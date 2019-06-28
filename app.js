//app.js，应用核心配置文件（入口文件）
// 拉取依赖 begin
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
// 拉取依赖　end


//拉取目录中其它ｊｓ文件　begin
var registerRouter = require('./src/register');
var indexRouter = require('./src/index');
var usersRouter = require('./src/users');
var loginRouter = require('./src/login');
var realregisterRouter = require('./src/realregister');
var trainRouter = require('./src/train');
var selectModelId = require('./src/selectModelId');
//拉取目录中其它ｊｓ文件　　end


var app = express();

//设置views文件夹，__dirname是node.js里面的全局变量。取得执行js所在的路径
app.set('views', path.join(__dirname, 'views'));
// 视图引擎设置
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: '/tmp/'}).array('image'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//session的设置
const hour = 1000 * 60 * 60;
var sessionOpts = {
    // 设置密钥
    secret: 'a cool secret',
    // Forces the session to be saved back to the session store
    resave: true,
    // Forces a session that is "uninitialized" to be saved to the store.
    saveUninitialized: true,
    // 设置会话cookie名, 默认是connect.sid
    key: 'myapp_sid',
    // If secure is set to true, and you access your site over HTTP, the cookie will not be set.
    cookie: {maxAge: hour * 2, secure: false}
}
app.use(session(sessionOpts))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/realregister', realregisterRouter);
app.use('/train', trainRouter);
app.use('/selectModelId', selectModelId);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //传递err参数
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');

});
//此处为module不为exports
module.exports = app;
