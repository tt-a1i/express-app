// 路由级中间件示例：简单认证中间件
// 这个中间件会检查请求是否包含有效的认证信息

function auth(req, res, next) {
	// 检查请求头中是否包含 authorization 字段
	const authHeader = req.headers.authorization;

	if (authHeader && authHeader.startsWith("Bearer ")) {
		// 提取 token
		const token = authHeader.substring(7);

		// 简单的 token 验证（实际项目中应该更复杂）
		if (token === "my-secret-token") {
			// 认证成功，将用户信息添加到请求对象中
			req.user = { id: 1, name: "Admin" };
			next(); // 继续执行下一个中间件
		} else {
			// 认证失败
			res.status(401).json({ error: "Invalid token" });
		}
	} else {
		// 没有提供认证信息
		res.status(401).json({ error: "Authorization header required" });
	}
}

// 导出中间件函数
module.exports = auth;
