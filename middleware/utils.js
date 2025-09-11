// 中间件工具函数

// 请求时间测量中间件
function requestTime(req, _res, next) {
  req.requestTime = Date.now();
  next();
}

// 响应时间计算中间件
function responseTime(req, res, next) {
  const start = Date.now();

  // 监听响应完成事件
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`,
    );
  });

  next();
}

// CORS 中间件
function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  // 处理预检请求
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
}

// 请求体大小限制中间件
function limitBodySize(req, res, next) {
  const MAX_BODY_SIZE = 1024 * 1024; // 1MB

  if (req.headers["content-length"]) {
    const contentLength = parseInt(req.headers["content-length"], 10);
    if (contentLength > MAX_BODY_SIZE) {
      return res.status(413).json({ error: "Request entity too large" });
    }
  }

  next();
}

module.exports = {
  requestTime,
  responseTime,
  cors,
  limitBodySize,
};
