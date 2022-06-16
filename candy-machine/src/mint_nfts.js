require("dotenv").config();
const fs = require("fs");
const os = require("os");

const wallets = require(`..${process.env.WALLETS_PATH}`);
const { runCommand } = require("../utils/cmd");
let minted = require("../config/minted.json");

const homeDir = os.homedir().replace(/\\/gi, "/");
const walletBasePath = process.cwd().replace(/\\/gi, "/") + "/keys/wallets/";
const candyMachine =
  "ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts".replace(
    "~",
    homeDir
  );

(async () => {
  for (const wallet of wallets) {
    if (minted.indexOf(wallet.number) >= 0) {
      continue;
    }

    console.log("minting to ", wallet.publicKey, " ", wallet.number);
    let cmd = `${candyMachine} mint_multiple_tokens -e mainnet-beta -k ${walletBasePath}${
      wallet.number - 1
    }.json -c ${process.env.CANDY_MACHINE_NAME} --number 3`;
    console.log(cmd);
    // const result = await runCommand(cmd);
    if (1) {
      minted.push(wallet.number);
      fs.writeFileSync("./config/minted.json", `[${minted}]`);
    }
  }
})();
