/** LISP 解析时的 type */
export const LispType = {
    /** 括号 */
    PAREN: 'paren',
    NUMBER: 'number',
    STRING: 'string',
    /** 操作符，例如 add */
    NAME: 'name'
};

/** AST type */
export const AstType = {
    PROGRAM: 'Program',
    NUMBER: 'NumberLiteral',
    STRING: 'StringLiteral',
    CALL_EXPRESSION: 'CallExpression'
};

/** New AST type */
export const NewAstType = {
    ...AstType,
    IDENTIFIER: 'Identifier',
    EXPRESSION_STATEMENT: 'ExpressionStatement'
};
