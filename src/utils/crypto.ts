import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export const encryptData = (data: any): string => {
  if (!SECRET_KEY) {
    throw new Error('SECRET_KEY bulunamadı');
  }
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (ciphertext: string): any => {
  if (!SECRET_KEY) {
    throw new Error('SECRET_KEY bulunamadı');
  }
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
