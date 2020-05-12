const path = require('path');
const { program } = require('commander');
const inquirer = require('inquirer');
const ora = require('ora');
const { readFile, writeFile } = require('./readwrite');
const encrypt = require('./encrypt');
const algoList = require('./algo.json');

const cwd = process.cwd();
const loading = ora('正在加密文件...');
let userAlgo = undefined;

program
    .option('-t,--target <target>', '生成文件名', 'conf')
    .option('-f,--file <file>', '加密文件', 'ui.yaml')
    .parse(process.argv);

inquirer.prompt({
    name: 'algo',
    message: '请选择加密算法 (choice algorithm)',
    default: 'rc4',
    type: 'list',
    choices: algoList
}).then((userSelect) => {
    loading.start();
    userAlgo = userSelect.algo;
    let original = path.join(cwd, program.file);
    return readFile(original);
}).then((data) => {
    return encrypt(data, userAlgo);
}).then((data) => {
    let finish = path.join(cwd, program.target);
    return writeFile(finish, data);
}).then(() => {
    loading.succeed('加密成功');
}).catch(err => {
    loading.fail(`加密失败:${err.message}`);
});
//     fs.readFile(path.resolve(__dirname, './file/ui.yaml'), 'utf8', (err, chunk) => {
//         let cipher = crypto.createCipher('rc4', 'az');
//         let encry = cipher.update(chunk, 'utf8', 'hex');
//         encry += cipher.final('hex');
//         fs.writeFile(path.resolve(__dirname, './file/ui.conf'), encry, (err) => console.log(err));
//     });
// });

