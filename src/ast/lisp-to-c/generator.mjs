import { NewAstType } from './constant.mjs';

/**
 * 生成代码：遍历 AST 生成最终代码
 *
 * 参考链接：https://juejin.cn/post/7155151377013047304/#heading-13
 *
 * @param {*} node 抽象语法树节点
 *
 * @returns {string} code
 */
export default function generator(node) {
    switch (node.type) {
        case NewAstType.PROGRAM:
            return node.body.map(generator).join('\n');
        case NewAstType.EXPRESSION_STATEMENT:
            return generator(node.expression) + ';';
        case NewAstType.CALL_EXPRESSION:
            return generator(node.callee) + '(' + node.arguments.map(generator).join(', ') + ')';
        case NewAstType.IDENTIFIER:
            return node.name;
        case NewAstType.NUMBER:
            return node.value;
        case NewAstType.STRING:
            return '"' + node.value + '"';
        // 容错处理
        default:
            throw new TypeError(node.type);
    }
}
