var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// 引入自定义中间件
var loggerMiddleware = require("./middleware/logger");
var {
  requestTime,
  responseTime,
  cors,
  limitBodySize,
} = require("./middleware/utils");
var { errorHandler } = require("./middleware/errorHandler");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var protectedRouter = require("./routes/protected");

var app = express();

// 应用级中间件示例
app.use(loggerMiddleware); // 日志记录中间件
app.use(requestTime); // 请求时间中间件
app.use(responseTime); // 响应时间中间件
app.use(cors); // CORS 中间件
app.use(limitBodySize); // 请求体大小限制中间件

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/protected", protectedRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// 错误处理中间件（必须放在所有路由之后）
app.use(errorHandler);

module.exports = app;
