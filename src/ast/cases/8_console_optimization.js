// 创建 console 日志打印插件，添加额外的信息：行号、文件位置

const core = require('@babel/core');
const types = require('@babel/types');
// const path = require('path');

const logPlugin = {
    visitor: {
        MemberExpression(_path, _state) {
            const { node } = _path;

            // console 日志打印判断
            if (
                node.object.name !== 'console' ||
                !['log', 'info', 'warn', 'error'].includes(node.property.name)
            ) {
                return;
            }

            // 找到行列位置，添加到打印输出中
            const { line, column } = node.loc.start;
            _path.parent.arguments.push(types.stringLiteral(`${line}:${column}`));

            // 找到文件名、输出路径，添加到输出中
            // windows 环境
            // const filename = _state.file.opts.filename;
            // const rootPath = path.join(__dirname, '../../../');
            // const relativePath = path.join(rootPath, filename).replace(/\\/g, '/');
            // _path.parent.arguments.push(types.stringLiteral(relativePath));
            const filePath = _state.file.opts.filename;
            _path.parent.arguments.push(types.stringLiteral(filePath));
        }
    }
};

const source = `
console.log('hello');
`;

const target = core.transform(source, {
    // 模拟环境
    filename: 'hello.js',
    plugins: [logPlugin]
});

console.log(target.code);
