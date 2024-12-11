// 2# 用 babel-plugin-transform-es2015-arrow-functions 插件转换箭头函数为普通函数
const core = require('@babel/core');
const arrowTransformPlugin = require('babel-plugin-transform-es2015-arrow-functions');

const source = `
const sum = (a, b) => {
    return a + b;
}
`;

// 用插件转换
const target = core.transform(source, {
    plugins: [arrowTransformPlugin]
});

console.log(target.code);
