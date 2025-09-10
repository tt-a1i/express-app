// 错误处理中间件示例
// 错误处理中间件必须有4个参数：err, req, res, next

function errorHandler(err, req, res, next) {
  // 记录错误日志
  console.error('Error occurred:', err.stack);
  
  // 检查错误类型并返回相应的响应
  if (err.status) {
    // 如果错误对象有 status 属性，使用该状态码
    res.status(err.status).json({
      error: err.message,
      status: err.status
    });
  } else {
    // 默认返回 500 内部服务器错误
    res.status(500).json({
      error: 'Internal Server Error',
      status: 500
    });
  }
}

// 异步错误处理包装器
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  errorHandler,
  asyncHandler
};
