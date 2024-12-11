// 1# 小试牛刀：修改函数名
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const generator = require('@babel/generator');

const source = `
const hello = () => {};
`;

// 1. 将代码转换成抽象语法树
const ast = parser.parse(source);

// 2. 转换树信息
traverse.default(ast, {
    // 和实现原理一样，通过 type 设置要遍历的节点
    Identifier: path => {
        const { node } = path;
        if (node.name === 'hello') {
            node.name = 'world';
        }
    }
});

// 3. 生成代码
const target = generator.default(ast, undefined, source);

console.log(target.code);
