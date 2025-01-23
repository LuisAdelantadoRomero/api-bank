const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; // Encryption algorithm
const secretKey = crypto.createHash('sha256').update('aXdeRtjakdlal').digest('hex').slice(0, 32); // Esto generará una clave de 32 bytes
const iv = crypto.randomBytes(16); // Initialization vector

// Function to encrypt the PIN
function encryptPin(pin) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encryptedPin = cipher.update(pin, 'utf8', 'hex');
  encryptedPin += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedPin }; // Return both the IV and the encrypted PIN
}

// Function to decrypt the PIN
function decryptPin(encryptedData) {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(encryptedData.iv, 'hex'));
  let decryptedPin = decipher.update(encryptedData.encryptedPin, 'hex', 'utf8');
  decryptedPin += decipher.final('utf8');
  return decryptedPin; // Return the decrypted PIN
}

module.exports = { encryptPin, decryptPin };
