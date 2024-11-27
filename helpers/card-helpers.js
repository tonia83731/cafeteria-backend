const crypto = require("crypto-js");

let amex = new RegExp("^3[47][0-9]{13}$");
let visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
let mastercard = new RegExp("^5[1-5][0-9]{14}$");
let mastercard2 = new RegExp("^2[2-7][0-9]{14}$");
let jcb = new RegExp("^35[0-9]{14}[0-9]*$");
const cardNum = [
  {
    label: "Visa",
    value: 1,
  },
  {
    label: "American Express",
    value: 2,
  },
  {
    label: "MasterCard",
    value: 3,
  },
  {
    label: "JCB",
    value: 4,
  },
];
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const creditCartType = (number) => {
  switch (true) {
    case visa.test(number):
      return 1;
    case amex.test(number):
      return 2;
    case mastercard.test(number) || mastercard2.test(number):
      return 3;
    case jcb.test(number):
      return 4;
    default:
      return null;
  }
};

const ecryptCardNumber = (number) => {
  return crypto.AES.encrypt(number, ENCRYPTION_KEY).toString();
};

const decryptCardNumber = (encryptedData) => {
  const bytes = crypto.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(crypto.enc.Utf8);
};

const hideCardNumber = (number) => {
  const cardStr = number.toString();
  const lastPartsDigits = cardStr.slice(12);

  let maskedPart = "**** **** ****";

  return maskedPart + " " + lastPartsDigits;
};

module.exports = {
  creditCartType,
  ecryptCardNumber,
  decryptCardNumber,
  hideCardNumber,
};
