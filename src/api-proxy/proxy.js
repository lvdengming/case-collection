const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 代理单类 api 请求
app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
    })
);

// 代理多类 api 请求
const map = new Map([
    ['/user', 'http://localhost:8000'],
    ['/product', 'http://localhost:8080']
]);
app.use(
    '/service',
    createProxyMiddleware({
        changeOrigin: true,
        // 添加自定义 token
        headers: { 'x-auth-token': '123' },
        // 根据路径选择目标
        router: req => {
            for (const [key, value] of map.entries()) {
                if (req.path.startsWith(key)) {
                    return value;
                }
            }

            // 默认目标
            return 'http://localhost:8000';
        },
        // 通用路径重写规则
        pathRewrite: { '^/[^/]+': '' }
    })
);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
