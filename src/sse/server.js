/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2025-05-29 07:15:43
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2025-05-29 07:36:42
 */
const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
// 允许跨域请求
app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

// SSE 请求
app.get('/api/sse', (req, res) => {
    // 设置响应头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 发送数据
    let count = 0;
    // 避免链接断开
    let isPing = true;
    const interval = setInterval(() => {
        isPing = !isPing;

        if (isPing) {
            const event = setEvent('ping', new Date());
            res.write(event);
        } else {
            count++;
            const data = { message: `Hello, this is message number ${count}` };
            const event = setEvent('message', data);
            res.write(event);
        }
    }, 1000);

    // 清理定时器
    req.on('close', () => {
        clearInterval(interval);
    });
});

function setEvent(type, data) {
    let event = '';

    // 可选，设置事件 ID
    event += `id: ${Date.now()}\n`;
    event += `event: ${type}\n`;
    event += `data: ${JSON.stringify(data)}\n`;
    // 可选，设置重试时间（毫秒）
    event += `retry: 10000\n`;
    // 必须有一个空行来结束事件
    event += `\n`;

    return event;
}

app.listen(3000, () => {
    console.log('SSE server is running on http://localhost:3000/api/sse');
});
