# Express.js 中间件学习指南

## 什么是中间件？

中间件（Middleware）是一个函数，它可以访问请求对象（request object）、响应对象（response object）以及应用程序的请求-响应循环中的下一个中间件函数（next middleware function）。

## 中间件的类型

### 1. 应用级中间件

应用级中间件绑定到 app 对象，使用 `app.use()` 或 `app.METHOD()`。

```javascript
// 示例：日志记录中间件
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
app.use(logger);
```

### 2. 路由级中间件

路由级中间件绑定到 `express.Router()` 实例。

```javascript
// 示例：认证中间件
function auth(req, res, next) {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'Protected resource' });
});
```

### 3. 错误处理中间件

错误处理中间件有四个参数：`(err, req, res, next)`。

```javascript
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
}
```

### 4. 内置中间件

Express 提供了一些内置中间件：
- `express.static` - 静态文件服务
- `express.json` - JSON 解析
- `express.urlencoded` - URL 编码解析

### 5. 第三方中间件

通过 npm 安装的第三方中间件：
- `morgan` - HTTP 请求日志
- `cors` - 跨域资源共享
- `helmet` - 安全头设置

## 中间件函数的参数

中间件函数可以有以下参数：
- `req` - 请求对象
- `res` - 响应对象
- `next` - 调用下一个中间件的函数
- `err` - 错误对象（仅用于错误处理中间件）

## 中间件的工作流程

1. 客户端发送请求
2. 应用级中间件按顺序执行
3. 路由匹配并执行路由级中间件
4. 路由处理器执行
5. 响应发送给客户端
6. 错误处理中间件（如果发生错误）

## 中间件使用示例

### 基本中间件
```javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
```

### 条件中间件
```javascript
app.use('/admin', (req, res, next) => {
  // 只对 /admin 路径生效
  next();
});
```

### 多个中间件
```javascript
app.use(middleware1, middleware2, middleware3);
// 或者
app.use(middleware1);
app.use(middleware2);
app.use(middleware3);
```

## 最佳实践

1. **顺序很重要** - 中间件按注册顺序执行
2. **调用 next()** - 不要忘记调用 next() 否则请求会被挂起
3. **错误处理** - 错误处理中间件必须放在所有路由之后
4. **模块化** - 将中间件拆分成独立的模块
5. **性能考虑** - 避免在中间件中执行耗时操作

## 本项目中的中间件示例

- `logger.js` - 应用级日志记录中间件
- `auth.js` - 路由级认证中间件
- `errorHandler.js` - 错误处理中间件
- `utils.js` - 实用工具中间件集合

## 测试中间件

可以使用 curl 命令测试中间件：

```bash
# 测试受保护的路由
curl http://localhost:3000/protected
curl -H "Authorization: Bearer my-secret-token" http://localhost:3000/protected
