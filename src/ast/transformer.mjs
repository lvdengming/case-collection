import { AstType, NewAstType } from './constant.mjs';
import traverse from './traverse.mjs';

/**
 * 转换器：将原 AST 转化为目标 AST
 *
 * 参考链接：https://juejin.cn/post/7155151377013047304/#heading-12
 *
 * @param {*} ast 原 AST
 *
 * @returns {*} 目标 AST
 */
export default function transformer(ast) {
    const newAst = {
        type: NewAstType.PROGRAM,
        body: []
    };

    // 通过在旧 AST 上挂载新 AST 引用，通过遍历旧 AST 得到想要的目标 AST
    ast.__context = newAst.body;
    traverse(ast, {
        // 对数字节点进行处理
        [AstType.NUMBER]: {
            enter(node, parent) {
                // 在新 AST 中创建一个新的数字节点
                parent.__context.push({
                    type: NewAstType.NUMBER,
                    value: node.value
                });
            }
        },

        // 对字符串节点进行处理
        [AstType.STRING]: {
            enter(node, parent) {
                // 在新 AST 中创建一个新的字符串节点
                parent.__context.push({
                    type: NewAstType.STRING,
                    value: node.value
                });
            }
        },

        // 对调用节点进行处理
        [AstType.CALL_EXPRESSION]: {
            enter(node, parent) {
                // 在新 AST 的调用节点中，相比旧 AST 部分内容有所调整
                let expression = {
                    type: NewAstType.CALL_EXPRESSION,
                    callee: {
                        type: NewAstType.IDENTIFIER,
                        name: node.value
                    },
                    arguments: []
                };

                // 同样的挂载处理，方便在遍历的时候生成新的 AST 结构
                node.__context = expression.arguments;
                // 如果父节点是调用节点，则用 ExpressionStatement 包裹当前调用节点
                if (parent.type !== AstType.CALL_EXPRESSION) {
                    expression = {
                        type: NewAstType.EXPRESSION_STATEMENT,
                        expression
                    };
                }

                parent.__context.push(expression);
            }
        }
    });

    return newAst;
}
