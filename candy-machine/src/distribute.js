require("dotenv").config();
const { runCommand } = require("../utils/cmd");
const whiteList = require(`../${process.env.WHITELIST_PATH}`);

const totalSupply = process.env.TOTAL_SUPPLY;
const splToken = process.env.SPL_TOKEN;
const splAccount = process.env.SPL_ACCOUNT;
const admin = process.env.SECONDARY_TREASURY;

let total = totalSupply;
(async () => {
  let cmd;
  for (const address of whiteList) {
    cmd = `spl-token transfer ${splToken} 3 ${address}`;
    await runCommand(cmd);
    console.log(cmd);
    total -= 3;
  }
  console.log(total);
  cmd = `spl-token transfer ${splToken} ${total} ${admin}`;
})();
