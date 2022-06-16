/*require("dotenv").config();
const { Keypair } = require("@solana/web3.js");
const fs = require("fs");
const bs58 = require("bs58");
// const { stringify } = require("querystring");

const wallets = [];
const walletDirPath = "." + process.env.WALLETS_DIR_PATH;
// const file = fs.createWriteStream("array.txt");

for (let i = 0; i < 500; i++) {
  let wallet = Keypair.generate();

  wallets.push({
    number: i + 1,
    publicKey: wallet.publicKey.toBase58(),
    privateKey: bs58.encode(wallet.secretKey),
  });

  fs.writeFileSync(walletDirPath + i + ".json", `[${wallet.secretKey}]`);
  console.log("key created :", wallet.publicKey.toBase58());
}

let content = wallets.reduce((a, b) => (a += JSON.stringify(b) + ","), "[");
content += "]";
fs.writeFileSync(`.${process.env.WALLETS_PATH}`, content, "utf8");
*/
