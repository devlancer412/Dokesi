require("dotenv").config();
const fs = require("fs");

const wallets = require(`..${process.env.WALLETS_PATH}`);
const { runCommand } = require("../utils/cmd");
let distributed = require("../config/sol_distributed.json");

const basfee = parseFloat(process.env.BAS_FEE);

(async () => {
  const result = await runCommand("solana balance");
  const totalValue = parseFloat(result.substring(0, result.indexOf("SOL") - 1));

  if (totalValue < wallets.length * basfee) {
    console.log("Not enough sol");
    return;
  }
  for (const wallet of wallets) {
    if (distributed.indexOf(wallet.number) >= 0) {
      continue;
    }
    console.log("sending to ", wallet.publicKey, " ", wallet.number);
    let cmd = `solana transfer ${wallet.publicKey} ${
      basfee * 3
    } --allow-unfunded-recipient`;
    const result = await runCommand(cmd);
    if (result != false) {
      distributed.push(wallet.number);
      fs.writeFileSync("./config/sol_distributed.json", `[${distributed}]`);
    }
  }
})();
