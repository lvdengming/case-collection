/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2025-05-11 10:50:08
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2025-05-11 11:10:32
 */
// const { webpack } = require('webpack');
const webpack = require('./webpack');
const options = require('./webpack.config.js');

const compiler = webpack(options);
compiler.run((err, stats) => {
    console.log(err);
    console.log(
        stats.toJson({
            // 打印本次编译产出的资源
            assets: true,
            // 打印本次编译产出的代码块
            chunks: true,
            // 打印本次编译产出的模块
            modules: true
        })
    );
});
