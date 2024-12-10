import { AstType } from './constant.mjs';

/**
 * 遍历 AST
 *
 * 参考链接：https://juejin.cn/post/7155151377013047304/#heading-11
 *
 * @param {*} ast 抽象语法树
 * @param {*} visitor 遍历器
 */
export default function traverse(ast, visitor) {
    // 遍历数组，实际上就是遍历每个节点
    function traverseNodeList(list, parent) {
        list.forEach(node => {
            traverseNode(node, parent);
        });
    }

    function traverseNode(node, parent) {
        // 该类节点的访问器
        const methods = visitor[node.type];

        // 如果有 enter 函数，则进入该节点
        if (methods && methods.enter) {
            methods.enter(node, parent);
        }

        // 根据节点类型进行处理
        switch (node.type) {
            // 对于 AST 根节点以及表达式这种有子节点的节点，需要使用 traverseNodeList 进行遍历
            case AstType.PROGRAM:
                traverseNodeList(node.body, node);
                break;
            case AstType.CALL_EXPRESSION:
                traverseNodeList(node.params, node);
            // 对于数字、字符串这种没有子节点的节点，直接跳过
            case AstType.NUMBER:
            case AstType.STRING:
                break;
            // 容错处理
            default:
                throw new TypeError(node.type);
        }

        // 如果有 exit 函数，则进入该节点
        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }

    // 从根节点开始遍历
    traverseNode(ast, null);
}
