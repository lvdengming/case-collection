// 更复杂形式：箭头函数没有块语句，直接返回结果
// 创建自定义插件，实现将箭头函数转普通函数

const core = require('@babel/core');
const types = require('@babel/types');

// 自定义函数转换插件
const arrowTransformPlugin = {
    visitor: {
        // 遍历箭头函数节点时，才会进入当前函数
        ArrowFunctionExpression: path => {
            const { node } = path;
            node.type = 'FunctionExpression';

            // 对是否有块语句进行判断、兼容处理
            if (!types.isBlockStatement(node.body)) {
                // 使用 types 中的方法进行构建
                // 先使用 returnStatement 将箭头函数 body 转换为 return 语句
                // 再使用 blockStatement 将结果整合成块语句
                node.body = types.blockStatement([types.returnStatement(node.body)]);
            }
        }
    }
};

const source = `
const sum = (a, b) => a + b;
`;

// 使用插件的方式，对源码进行转换
const target = core.transform(source, {
    plugins: [arrowTransformPlugin]
});

console.log(target.code);
