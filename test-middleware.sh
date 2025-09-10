#!/bin/bash

echo "=== Express.js 中间件测试脚本 ==="
echo

echo "1. 测试基本路由 (应该成功)"
curl -s http://localhost:3000
echo
echo

echo "2. 测试用户路由 (应该成功)"
curl -s http://localhost:3000/users
echo
echo

echo "3. 测试受保护路由 (没有认证头 - 应该失败)"
curl -s http://localhost:3000/protected
echo
echo

echo "4. 测试受保护路由 (错误token - 应该失败)"
curl -s -H "Authorization: Bearer wrong-token" http://localhost:3000/protected
echo
echo

echo "5. 测试受保护路由 (正确token - 应该成功)"
curl -s -H "Authorization: Bearer my-secret-token" http://localhost:3000/protected
echo
echo

echo "6. 测试受保护的用户资料路由 (正确token - 应该成功)"
curl -s -H "Authorization: Bearer my-secret-token" http://localhost:3000/protected/profile
echo
echo

echo "7. 测试POST受保护数据 (正确token - 应该成功)"
curl -s -X POST -H "Authorization: Bearer my-secret-token" -H "Content-Type: application/json" -d '{"message": "Hello World"}' http://localhost:3000/protected/data
echo
echo

echo "测试完成！查看服务器日志可以观察中间件的工作过程。"
