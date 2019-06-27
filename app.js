//app.js，应用核心配置文件（入口文件）
// 拉取依赖 begin
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer  = require('multer');
// 拉取依赖　end

//拉取目录中其它ｊｓ文件　begin
var registerRouter = require('./routes/register');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var realregisterRouter = require('./routes/realregister');
var trainRouter = require('./routes/train');
//拉取目录中其它ｊｓ文件　　end

var app = express();

//设置views文件夹，__dirname是node.js里面的全局变量。取得执行js所在的路径
app.set('views', path.join(__dirname, 'views'));
// 视图引擎设置
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/realregister',realregisterRouter);
app.use('/train',trainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //传递err参数
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});
//此处为module不为exports
module.exports = app;
