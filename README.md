# Express.js 项目

这是一个使用 Express 应用程序生成器创建的 Express.js 项目。

## Git 配置

本项目已与远程仓库关联：
- 远程仓库: `git@github.com:tt-a1i/express-app.git`
- 分支: `main`

## 项目结构

```
.
├── app.js              # 应用程序入口文件
├── bin/
│   └── www            # 服务器启动脚本
├── package.json       # 项目配置和依赖
├── public/            # 静态资源文件
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
│       └── style.css
├── routes/            # 路由文件
│   ├── index.js
│   └── users.js
└── views/             # 视图模板文件
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

## 依赖说明

- **express**: Express.js 框架
- **jade**: 模板引擎（已弃用，建议使用 pug）
- **morgan**: HTTP 请求日志中间件
- **cookie-parser**: Cookie 解析中间件
- **http-errors**: HTTP 错误处理
- **debug**: 调试工具

## 运行项目

```bash
# 安装依赖
pnpm install

# 启动服务器
pnpm start
```

服务器将在 `http://localhost:3000` 上运行。

## 路由

- `GET /` - 主页
- `GET /users` - 用户页面

## 注意事项

1. 项目使用 pnpm 作为包管理工具
2. Jade 模板引擎已被弃用，建议迁移到 Pug
3. 可以通过修改 `routes/` 目录下的文件来添加新的路由
4. 静态资源文件放在 `public/` 目录下

## 中间件学习

本项目包含多个中间件示例，位于 `middleware/` 目录中：
- `logger.js` - 应用级日志记录中间件
- `auth.js` - 路由级认证中间件
- `errorHandler.js` - 错误处理中间件
- `utils.js` - 实用工具中间件集合

详细说明请查看 [middleware/README.md](middleware/README.md)
