// 来源：https://www.lijinke.cn/2019/12/26/Node-js-%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%9A%84%E8%BF%9B%E5%BA%A6%E6%9D%A1/
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const limit = 20; // 模拟提取时长

const printProgress = (index) => {
    const loadedBar = '='.repeat(index);
    const unloadBar = '-'.repeat(limit - index);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    process.stdout.write(`提取中 : ${loadedBar}${unloadBar}`);
};

const print = (money, index) => {
    printProgress(index);
    if (index === limit) {
        process.stdout.write(chalk.green(`\n √ 成功提款：${money} 元\n`));
        process.exit(0);
    }
};

const getMoney = (answer) => {
    let index = 0;
    setInterval(() => {
        ++index;
        print(answer, index);
    }, 200);
};

rl.question('[成都银行欢迎您] 请输入要提取的金额 : \r', getMoney);
