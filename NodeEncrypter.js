const crypto   = require('crypto');
const readlineSync = require('readline-sync');

console.log("Welcome to NodeEncrypter!")
var options = ['encrypt', 'decrypt'];
var choice = readlineSync.keyInSelect(options, 'What would you like to do?');

var key, index, textToEncrypt, textToDecrypt, encrypted, decrypted;
var cipher, decipher;
var algo = [ "aes128", "aes192", "aes256", "des3", "desx", "rc2"];

if (options[choice] == 'encrypt') {
    key = readlineSync.question('Enter a key for the encryption cipher: ');
    index = readlineSync.keyInSelect(algo, 'Select an encryption algorithm');
    cipher = crypto.createCipher(algo[index], key);
    textToEncrypt = readlineSync.question('Enter text to encrypt: ', {
        hideEchoBack: true    
    });
    encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');     
    encrypted += cipher.final('hex');
    console.log("Encrypted text = " + encrypted);
    
} else if (options[choice] == 'decrypt') {
    key = readlineSync.question('Enter a key for the decryption cipher: ');
    index = readlineSync.keyInSelect(algo, 'Select an algorithm for decryption');
    decipher = crypto.createDecipher(algo[index], key);
    textToDecrypt = readlineSync.question("Enter text to decrypt: ");
    decrypted = decipher.update(textToDecrypt, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log("Decrypted text = " + decrypted);
} else {
    return true;    
}
