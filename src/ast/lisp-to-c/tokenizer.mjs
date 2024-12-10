import { LispType } from './constant.mjs';

/**
 * 词法分析：将代码转换为 tokens
 *
 * 参考链接：https://juejin.cn/post/7155151377013047304/#heading-9
 *
 * @param {string} input 代码字符串
 *
 * @returns {*} tokens
 */
export default function tokenizer(input) {
    // 最终生成的 tokens
    const tokens = [];
    // 在代码字符串中的当前索引
    let curr = 0;

    while (curr < input.length) {
        let char = input[curr];

        // 开括号表示 LISP 的一块运算，用 LispType.PAREN 表示
        if (char === '(') {
            tokens.push({
                type: LispType.PAREN,
                value: '('
            });

            curr++;
            continue;
        }

        // 闭括号同上
        if (char === ')') {
            tokens.push({
                type: LispType.PAREN,
                value: ')'
            });

            curr++;
            continue;
        }

        // 空白字符直接跳过
        if (/\s/.test(char)) {
            curr++;
            continue;
        }

        // 匹配数字，数字可能是连续的，例如：(add 222 111)
        if (/[0-9]/.test(char)) {
            let value = '';
            while (/[0-9]/.test(char)) {
                value += char;
                char = input[++curr];
            }

            // 此时 input[curr] 不是数字，curr 不需要再自增
            tokens.push({
                type: LispType.NUMBER,
                value
            });

            continue;
        }

        // 匹配字符串，目前只匹配双引号
        if (char === '"') {
            let value = '';
            char = input[++curr];

            while (char !== '"') {
                value += char;
                char = input[++curr];
            }

            tokens.push({
                type: LispType.STRING,
                value
            });

            // 此时 input[curr] 是双引号，所以还需要自增
            curr++;
            continue;
        }

        // 匹配操作符，可能是连续的值，例如 add
        if (/[a-z]/i.test(char)) {
            let value = '';

            while (/[a-z]/i.test(char)) {
                value += char;
                char = input[++curr];
            }

            tokens.push({
                type: LispType.NAME,
                value
            });

            continue;
        }

        // 容错处理，如果什么都没有匹配到，说明这个 token 不在解析范围内
        throw new TypeError("I don't know what this character is: " + char);
    }

    return tokens;
}

// 测试代码
// const tokens = tokenizer('(add 2 (subtract 4 2))');
// console.log(tokens);

// 输出结果：
// [
//     { type: 'paren', value: '(' },
//     { type: 'name', value: 'add' },
//     { type: 'number', value: '2' },
//     { type: 'paren', value: '(' },
//     { type: 'name', value: 'subtract' },
//     { type: 'number', value: '4' },
//     { type: 'number', value: '2' },
//     { type: 'paren', value: ')' },
//     { type: 'paren', value: ')' }
// ]
