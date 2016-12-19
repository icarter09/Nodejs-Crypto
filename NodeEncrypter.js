const crypto   = require('crypto');
const readlineSync = require('readline-sync');

var key, index;
var textToEncrypt, textToDecrypt;
var encrypted, decrypted;
var options, algo;
var cipher, decipher;

initializeArrays();
displayWelcomeText();

var choice = startProgram();
if (options[choice] == 'encrypt') {
    key = encryptionKeyQuestion();
    index = encryptionAlgorithmQuestion(); 
    if (index == -1) {
        return true;
    }
    cipher = createEncryptionCipher(index, key);
    textToEncrypt = encryptTextQuestion();
    encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');     
    encrypted += cipher.final('hex');
    displayEncryptedText();
} else if (options[choice] == 'decrypt') {
    key = decryptionKeyQuestion();
    index = decryptionAlgorithmQuestion();
    if (index == -1) {
        return true;
    }
    decipher = createDecryptionCipher(index, key);
    textToDecrypt = decryptTextQuestion();
    decrypted = decipher.update(textToDecrypt, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    displayDecryptedText();
} else {
    return true;    
}

function initializeArrays() {
    options = ['encrypt', 'decrypt'];
    algo = [ "aes128", "aes192", "aes256", "des3", "desx", "rc2"];
}

function displayWelcomeText() {
    console.log("Welcome to NodeEncrypter!")
}

function startProgram() {
    return readlineSync.keyInSelect(options, 'What would you like to do?');
}

function displayDecryptedText() {
    console.log("Decrypted text = " + decrypted);
}

function decryptTextQuestion() {
    return readlineSync.question("Enter text to decrypt: ");
}

function createDecryptionCipher(index, key) {
    return crypto.createDecipher(algo[index], key);
}

function decryptionAlgorithmQuestion() {
    return readlineSync.keyInSelect(algo, 'Select an algorithm for decryption');
}

function decryptionKeyQuestion() {
    return readlineSync.question('Enter a key for the decryption cipher: ');
}

function encryptionKeyQuestion() {
    return readlineSync.question('Enter a key for the encryption cipher: ');
}

function encryptionAlgorithmQuestion() {
    return readlineSync.keyInSelect(algo, 'Select an encryption algorithm');
}

function createEncryptionCipher(index, key) {
    return crypto.createCipher(algo[index], key);
}

function encryptTextQuestion() { 
    return readlineSync.question('Enter text to encrypt: ', {
        hideEchoBack: true    
    });
}

function displayEncryptedText() {
    console.log("Encrypted text = " + encrypted);
}
