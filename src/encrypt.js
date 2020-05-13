const crypto = require('crypto');
const key = require('./key');
const yaml = require('js-yaml');

/**
 * 加密内容
 * @param {string} content 内容
 * @param {string} algo 算法（默认rc4）
 */
function encrypt(content, algo = 'rc4') {
    let cipher = crypto.createCipher(algo, key);
    let encry = cipher.update(content, 'utf8', 'hex');
    encry += cipher.final('hex');
    return encry;
}

/**
 * 解密内容
 * @param {string} content  加密内容
 * @param {string} algo 算法
 */
function unencrypt(content, algo = 'rc4') {
    let decipher = crypto.createDecipher(algo, key);
    let conf = decipher.update(content, 'hex', 'utf8');
    conf += decipher.final('utf8');
    return yaml.safeLoad(conf);
}

module.exports = { encrypt, unencrypt };