const fs = require('fs');

/**
 * 读取文件
 * @param {*} path 路径
 */
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, chunk) => {
            if (err) {
                reject(err);
            } else {
                resolve(chunk);
            }
        });
    });
}

/**
 * 写入文件
 * @param {string} path 存储路径
 * @param {string} data  数据
 */
function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}

module.exports = { readFile, writeFile };

