const crypto = require('crypto');
const assert = require('assert');

const cipher = crypto.createCipher('aes192', 'a password');
const decipher = crypto.createDecipher('aes192', 'a password');

var encrypted = cipher.update('hello world', 'utf8', 'hex');
encrypted += cipher.final('hex');

var decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');

assert.equal(decrypted, 'hello world');
assert.notEqual(decrypted, 'derp derp');
