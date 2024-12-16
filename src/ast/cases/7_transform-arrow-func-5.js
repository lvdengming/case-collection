// 更复杂形式：处理箭头函数中的 this
// 创建自定义插件进行处理

const core = require('@babel/core');
const types = require('@babel/types');

const arrowFuncPlugin = {
    visitor: {
        // 如果是箭头函数，则会进入当前函数
        ArrowFunctionExpression(path) {
            const { node } = path;
            // 提升函数环境，解决 this 作用域问题
            hoistFunctionEnvironment(path);

            // 将箭头函数转换为普通函数
            node.type = 'FunctionExpression';
            // 函数体非块语句处理
            if (!types.isBlockStatement(node.body)) {
                node.body = types.blockStatement([types.returnStatement(node.body)]);
            }
        }
    }
};

// 提升函数环境，解决 this 作用域问题
function hoistFunctionEnvironment(path) {
    // 确定当前箭头函数要使用哪个地方的 this（找到父作用域）
    const thisEnv = path.findParent(parent => {
        // 要求父节点是函数且非箭头函数，否则返回根节点
        return (parent.isFunction() && !parent.isArrowFunctionExpression()) || parent.isProgram();
    });

    // 向父作用域中添加 _this 变量
    thisEnv.scope.push({
        // 生成标识符节点，也就是变量名
        id: types.identifier('_this'),
        // 生成 this 节点，也就是变量值
        init: types.thisExpression()
    });

    // 获取当前节点所有 this 的路径
    const thisPaths = [];
    path.traverse({
        ThisExpression(thisPath) {
            thisPaths.push(thisPath);
        }
    });

    // 替换所有的 this 为 _this
    thisPaths.forEach(thisPath => {
        thisPath.replaceWith(types.identifier('_this'));
    });
}

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
