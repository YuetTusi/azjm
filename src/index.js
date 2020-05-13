const path = require('path');
const { program } = require('commander');
const inquirer = require('inquirer');
const ora = require('ora');
const { readFile, writeFile } = require('./readwrite');
const { encrypt, unencrypt } = require('./encrypt');
const algoList = require('./algo.json');

const cwd = process.cwd();
const loading = ora('正在处理...');
let userAlgo = undefined;

program
    .option('-t, --target <target>', '加密文件名', 'conf')
    .option('-f, --file <file>', '目标文件', 'ui.yaml')
    .option('-u --unenc <file>', '解密文件')
    .parse(process.argv);

inquirer.prompt({
    name: 'algo',
    message: '选择算法 (默认rc4)',
    default: 'rc4',
    type: 'list',
    choices: algoList
}).then((userSelect) => {
    loading.start();
    userAlgo = userSelect.algo;
    if (program.unenc) {
        //#解密
        return readFile(path.join(cwd, program.unenc));
    } else {
        //#加密
        return readFile(path.join(cwd, program.file));
    }
}).then((content) => {
    if (program.unenc) {
        //#解密
        return unencrypt(content, userAlgo);
    } else {
        //#加密
        return encrypt(content, userAlgo);
    }
}).then((result) => {
    if (program.unenc) {
        return writeFile(path.join(cwd, 'conf-unencrypt.json'), JSON.stringify(result));
    } else {
        return writeFile(path.join(cwd, program.target), result);
    }
}).then(() => {
    if (program.unenc) {
        loading.succeed('解密成功, 文件：conf-unencrypt.json');
    } else {
        loading.succeed('加密成功');
    }
}).catch(err => {
    loading.fail(`处理失败:${err.message}`);
});
