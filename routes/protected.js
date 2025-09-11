var express = require("express");
var router = express.Router();

// 引入认证中间件
var auth = require("../middleware/auth");
var { asyncHandler } = require("../middleware/errorHandler");

/* GET 受保护的资源 */
router.get("/", auth, (req, res, _next) => {
  res.json({
    message: "This is a protected resource",
    user: req.user,
    timestamp: new Date().toISOString(),
  });
});

/* GET 用户信息（使用异步处理） */
router.get(
  "/profile",
  auth,
  asyncHandler(async (req, res, _next) => {
    // 模拟异步操作
    await new Promise((resolve) => setTimeout(resolve, 100));

    res.json({
      user: req.user,
      requestTime: req.requestTime,
      profile: {
        id: req.user.id,
        name: req.user.name,
        role: "admin",
      },
    });
  }),
);

/* POST 受保护的数据 */
router.post("/data", auth, (req, res, _next) => {
  const data = req.body;

  // 检查请求体
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: "Data is required" });
  }

  res.json({
    message: "Data received successfully",
    data: data,
    user: req.user,
  });
});

module.exports = router;
