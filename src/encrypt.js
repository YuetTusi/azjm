const crypto = require('crypto');
const key = require('./key');

/**
 * 加密内容
 * @param {string} content 内容
 * @param {string} algo 加密算法（默认rc4）
 */
function encrypt(content, algo = 'rc4') {
    let cipher = crypto.createCipher(algo, key);
    let encry = cipher.update(content, 'utf8', 'hex');
    encry += cipher.final('hex');
    return encry;
}

module.exports = encrypt;