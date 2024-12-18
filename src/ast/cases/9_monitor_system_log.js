// 监控系统日志上传插件，在每个函数体开始添加日志调用方法

const core = require('@babel/core');
const types = require('@babel/types');
const template = require('@babel/template');

const autoImportLogPlugin = {
    visitor: {
        // 保证模块内一定会引入日志模块
        Program(path, state) {
            let loggerId;

            // 遍历子节点
            path.traverse({
                ImportDeclaration(_path) {
                    const { node } = _path;

                    // 当前模块已引入 logger 模块
                    if (node.source.value === 'logger') {
                        loggerId = node.specifiers[0]?.local?.name;
                        // 停止遍历
                        path.stop();
                    }
                }
            });

            // 如果没有引入 logger 模块则需要手动引入
            if (!loggerId) {
                // 生成唯一的导入名称
                loggerId = path.scope.generateUid('logger');
                // path.node.body.unshift(
                //     types.importDeclaration(
                //         [types.importDefaultSpecifier(types.identifier(loggerId))],
                //         types.stringLiteral('logger')
                //     )
                // );
                // 使用 template 优化节点创建写法
                path.node.body.unshift(template.statement(`import ${loggerId} from 'logger';`)());
            }

            // 在共享容器中挂载日志函数调用节点
            // state.loggerNode = types.expressionStatement(
            //     // 空数组表示函数调用不需要传递参数
            //     types.callExpression(types.identifier(loggerId), [])
            // );
            // 使用 template 优化节点创建写法
            state.loggerNode = template.statement(`${loggerId}()`)();
        },

        // 为每个函数内部添加日志调用节点
        // babel支持这种多种节点同时声明的写法（不能有空格）
        'FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ClassMethod'(path, state) {
            const { node } = path;

            // 函数体是块语句、非块语句分开处理
            if (types.isBlockStatement(node.body)) {
                // 在函数体内头部添加 loggerNode
                node.body.body.unshift(state.loggerNode);
            } else {
                // 箭头函数处理：生成块语句，添加 loggerNode，添加 return 语句
                node.body = types.blockStatement([
                    state.loggerNode,
                    types.returnStatement(node.body)
                ]);
            }
        }
    }
};

const source = `
function add(a, b) {
    return a + b;
}

const minus = function (a, b) {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};

class Calculator {
    divide(a, b) {
        return a / b;
    }
}
`;

const target = core.transform(source, {
    plugins: [autoImportLogPlugin]
});

console.log(target.code);
