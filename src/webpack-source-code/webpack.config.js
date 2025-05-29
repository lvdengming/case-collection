/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2025-05-11 10:50:02
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2025-05-11 10:51:53
 */
const path = require('path');

module.exports = {
    //防止代码被压缩
    mode: 'development',
    //入口文件
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    //防止干扰源文件
    devtool: 'source-map'
};
