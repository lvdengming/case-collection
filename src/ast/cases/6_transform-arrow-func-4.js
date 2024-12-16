// 更复杂形式：处理箭头函数中的 this
// 使用 babel-plugin-transform-es2015-arrow-functions 插件进行处理

const core = require('@babel/core');
const arrowFuncPlugin = require('babel-plugin-transform-es2015-arrow-functions');

const source = `
const sum = (a, b) => {
    console.log(this);
    return a + b;
};
`;

const target = core.transform(source, {
    plugins: [arrowFuncPlugin]
});

console.log(target.code);
