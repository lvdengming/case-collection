import { AstType, LispType } from './constant.mjs';

/**
 * 语法分析：将 tokens 转换成 AST
 *
 * 参考链接：https://juejin.cn/post/7155151377013047304/#heading-10
 *
 * @param {*} tokens
 */
export default function parser(tokens) {
    // 遍历 tokens 的下标
    let curr = 0;

    // 创建辅助函数遍历 tokens
    const walk = () => {
        let token = tokens[curr];

        // 解析数字
        if (token.type === LispType.NUMBER) {
            curr++;

            return {
                type: AstType.NUMBER,
                value: token.value
            };
        }

        // 解析字符串
        if (token.type === LispType.STRING) {
            curr++;

            return {
                type: AstType.STRING,
                value: token.value
            };
        }

        // 解析调用语句
        if (token.type === LispType.PAREN && token.value === '(') {
            token = tokens[++curr];

            // 此时 token.name 就是调用函数名
            const node = {
                type: AstType.CALL_EXPRESSION,
                value: token.value,
                params: []
            };

            token = tokens[++curr];
            // 通过递归，不断读取参数
            while (
                token.type !== LispType.PAREN ||
                (token.type === LispType.PAREN && token.value !== ')')
            ) {
                node.params.push(walk());
                // 在辅助函数中，curr 会不断增加，所以不需要 ++
                token = tokens[curr];
            }

            // 当前中断读取完了，此时 token.value 是 ")"，直接跳过
            curr++;
            return node;
        }

        //容错处理
        throw new TypeError(token.type);
    };

    const ast = {
        type: AstType.PROGRAM,
        body: []
    };

    while (curr < tokens.length) {
        // 在辅助函数中，curr 会不断增加
        ast.body.push(walk());
    }

    return ast;
}
