require("dotenv").config();
const { runCommand } = require("../utils/cmd");
const whiteList = require(`../${process.env.WHITELIST_PATH}`);
const sended = require("../config/distributed.json");

const totalSupply = process.env.TOTAL_SUPPLY;
const splToken = process.env.SPL_TOKEN;
const splAccount = process.env.SPL_ACCOUNT;
const admin = process.env.SECONDARY_TREASURY;

let total = totalSupply;
(async () => {
  let cmd;
  while (whiteList.length > 0) {
    console.log(`sending to ${whiteList[0]}`, " left:", whiteList.length);
    if (sended.indexOf(whiteList[0]) >= 0) {
      whiteList.shift();
      continue;
    }
    cmd = `spl-token transfer ${splToken} 3 ${whiteList[0]} --allow-unfunded-recipient --fund-recipient`;
    const result = await runCommand(cmd);

    if (result) {
      whiteList.shift();
    }
  }

  console.log(total);
  // cmd = `spl-token transfer ${splToken} ${total} ${admin}`;
})();
