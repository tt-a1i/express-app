// 应用级中间件示例：日志记录中间件
// 这个中间件会记录每个请求的信息

function logger(req, res, next) {
  // 记录请求时间、方法和URL
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  // 调用 next() 将控制权传递给下一个中间件
  next();
}

module.exports = logger;
