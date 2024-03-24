const execSync = require('child_process').execSync;
const path = require('path');
const dayjs = require('dayjs');
const argv = require('minimist')(process.argv.slice(2));

const root = path.resolve(__dirname, '..');
const commands = ['prettier --write --ignore-unknown .', `node dist/${argv.path}`];
const dateStr = 'YYYY-MM-DD HH:mm:SSS';

for (const command of commands) {
    const time = `[${dayjs().format(dateStr)}]`;
    console.log(`\n${time} Running: ${command}`);
    execSync(command, { stdio: [0, 1, 2], cwd: root });
}
