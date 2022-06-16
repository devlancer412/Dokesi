require("dotenv").config();
const { Keypair } = require("@solana/web3.js");
const fs = require("fs");
const bs58 = require("bs58");

const payer = Keypair.generate();

fs.writeFileSync(`${process.env.SECRETKEY_PATH}`, `[${payer.secretKey}]`);

fs.writeFileSync(
  `${process.env.PUBLICKEY_PATH}`,
  `module.exports = [${payer.publicKey}]`
);

fs.writeFileSync(
  `${process.env.PRIVATEKEY_PAHT}`,
  `private key: ${bs58.encode(payer.secretKey)}`
);

console.log("key created :", payer.publicKey);
