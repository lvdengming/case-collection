const execSync = require('child_process').execSync;
const path = require('path');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));

const root = path.resolve(__dirname, '..');
const commands = ['tsc', 'prettier --write --ignore-unknown **/*', `node dist/${argv.path}`];

for (const command of commands) {
    console.log(chalk.green(`\n> Running: ${command}`));
    execSync(command, { stdio: [0, 1, 2], cwd: root });
}
