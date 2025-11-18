import CryptoJS from "crypto-js";

export function generateSecretHash(username, clientId, clientSecret) {
  const message = username + clientId;
  const hmac = CryptoJS.HmacSHA256(message, clientSecret);
  return CryptoJS.enc.Base64.stringify(hmac);
}
