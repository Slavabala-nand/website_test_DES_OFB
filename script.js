function addFadeInEffect(element) {
    element.classList.remove('fade-in');
    void element.offsetWidth; // Trigger reflow
    element.classList.add('fade-in');
}

function encryptText() {
    const plainText = document.getElementById('plainText').value;
    const key = document.getElementById('encryptKey').value;
    const encryptedTextElement = document.getElementById('encryptedText');
    
    if (plainText && key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const ivHex = CryptoJS.lib.WordArray.random(8);
        const encrypted = CryptoJS.DES.encrypt(plainText, keyHex, { mode: CryptoJS.mode.OFB, iv: ivHex });
        encryptedTextElement.value = ivHex.toString() + encrypted.ciphertext.toString();
        addFadeInEffect(encryptedTextElement);
    } else {
        alert("Please enter text and key for encryption.");
    }
}

function decryptText() {
    const cipherText = document.getElementById('cipherText').value;
    const key = document.getElementById('decryptKey').value;
    const decryptedTextElement = document.getElementById('decryptedText');
    
    if (cipherText && key) {
        const keyHex = CryptoJS.enc.Utf8.parse(key);
        const ivHex = CryptoJS.enc.Hex.parse(cipherText.slice(0, 16));
        const encryptedHex = CryptoJS.enc.Hex.parse(cipherText.slice(16));
        const encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);
        const decrypted = CryptoJS.DES.decrypt(encryptedBase64, keyHex, { mode: CryptoJS.mode.OFB, iv: ivHex });
        decryptedTextElement.value = decrypted.toString(CryptoJS.enc.Utf8);
        addFadeInEffect(decryptedTextElement);
    } else {
        alert("Please enter text and key for decryption.");
    }
}
