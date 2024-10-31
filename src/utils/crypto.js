import CryptoJS from "crypto-js";
import config from "../config";

export function encrypted(plainText) {
  var key = CryptoJS.enc.Utf8.parse(config.key_encrypt);
  var iv = CryptoJS.enc.Utf8.parse(config.iv_encrypt);
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(plainText), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  });
  var base64 = encrypted.toString();

  // Ubah Base64 ke Base64URL
  var base64url = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return base64url;
}

export function decrypted(encrypted) {
  var base64 =
    encrypted.replace(/-/g, "+").replace(/_/g, "/") +
    "==".substring(0, (3 * encrypted.length) % 4);

  var key = CryptoJS.enc.Utf8.parse(config.key_encrypt);
  var iv = CryptoJS.enc.Utf8.parse(config.iv_encrypt);
  var decrypted;
  try {
    var decryptedBytes = CryptoJS.AES.decrypt(base64, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });
    var decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    decrypted = JSON.parse(decryptedText); //
  } catch (e) {
    // Handle error
    console.error("Error decrypting or parsing JSON:", e);
    decrypted = null;
  }
  return decrypted;
}
