// 创建自定义插件，实现重命名函数
const core = require('@babel/core');

// babel 插件是一个对象，对象里面有一个visitor属性，它也是一个对象，key为类型，value为函数，接受path作为参数
const renameFuncPlugin = {
    visitor: {
        Identifier: path => {
            const { node } = path;
            if (node.name === 'hello') {
                node.name = 'world';
            }
        }
    }
};

const source = `
const hello = () => {};
`;

const target = core.transform(source, {
    plugins: [renameFuncPlugin]
});

console.log(target.code);
