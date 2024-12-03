import fs from 'fs';
import path from 'path';
import url from 'url';
import generator from './generator.mjs';
import parser from './parser.mjs';
import tokenizer from './tokenizer.mjs';
import transformer from './transformer.mjs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lisp = '(add 2 (subtract 4 2))';

const tokens = tokenizer(lisp);
const ast = parser(tokens);

const astStr = JSON.stringify(ast, undefined, 2);
const p1 = path.join(__dirname, 'output', 'ast.json');
fs.writeFileSync(p1, astStr);

// 测试代码
// traverse(ast, {
//     CallExpression: {
//         enter(node, parent) {
//             console.log(node.value);
//         }
//     },
//     NumberLiteral: {
//         enter(node, parent) {
//             console.log(node.value);
//         }
//     }
// });

const newAst = transformer(ast);

const newAstStr = JSON.stringify(newAst, undefined, 2);
const p2 = path.join(__dirname, 'output', 'newAst.json');
fs.writeFileSync(p2, newAstStr);

// 生成代码
const code = generator(newAst);

console.log(`LISP: ${lisp}`);
console.log(`   C: ${code}`);
