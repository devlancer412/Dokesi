require("dotenv").config();
const fs = require("fs");
const os = require("os");
const candyMachine = require("./.cache/devnet-NFTExample.json");

const { runCommand } = require("./utils/cmd");

const homeDir = os.homedir();
const gName = process.env.NFT_NAME;
const keyPairPath = process.env.KEYPAIR_PATH.replace("~", homeDir);
const rpcUrl = process.env.RPC_URL;
const imageDirUrl = process.env.IMAGE_DIR_PATH;

(async () => {
  let cmd = `metaboss derive cmv2-creator ${candyMachine.program.candyMachine} -r ${rpcUrl}`;

  console.log("Getting creator of candy machine...");
  let result = await runCommand(cmd);

  if (!result) {
    console.log("Error appeared when getting account");
    return;
  }

  const creator = result.match(/([A-Za-z0-9]{44})/)[0];

  console.log("Creator:", creator);

  cmd = `metaboss snapshot mints --creator ${creator} -o ./snapshot -r ${rpcUrl}`;
  console.log("Getting all mints...");
  result = await runCommand(cmd);

  cmd = `metaboss decode mint --list-file ./snapshot/${creator}_mint_accounts.json -o ./snapshot`;
  console.log("Decoding mints....");
  result = await runCommand(cmd);

  let revealedAccounts = require("./snapshot/revealed.json");
  const accounts = require(`./snapshot/${creator}_mint_accounts.json`);

  for (const account of accounts) {
    if (revealedAccounts.filter((revealed) => revealed === account).length) {
      continue;
    }

    console.log("Fetching account:", account);

    const accountData = require(`./snapshot/${account}.json`);
    const number = accountData.name.substr(
      gName.length + 1,
      accountData.name.length - gName.length - 1
    );

    cmd = `metaboss update uri --keypair ${keyPairPath} --account ${account} --new-uri ${
      imageDirUrl + number
    }.json`;

    result = await runCommand(cmd);

    if (!result) {
      return;
    }

    revealedAccounts.push(account);
  }

  fs.writeFileSync(
    "./snapshot/revealed.json",
    JSON.stringify(revealedAccounts)
  );
})();
