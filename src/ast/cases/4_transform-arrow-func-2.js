// 简单形式
// 创建自定义插件，实现将箭头函数转普通函数

const core = require('@babel/core');

// 自定义函数转换插件
const arrowTransformPlugin = {
    visitor: {
        // 遍历箭头函数节点时，才会进入当前函数
        ArrowFunctionExpression: path => {
            const { node } = path;
            node.type = 'FunctionExpression';
        }
    }
};

const source = `
const sum = (a, b) => {
    return a + b;
};
`;

// 使用插件的方式，对源码进行转换
const target = core.transform(source, {
    plugins: [arrowTransformPlugin]
});

console.log(target.code);
