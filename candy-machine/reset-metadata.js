require("dotenv").config();
const fs = require("fs");
const os = require("os");
const candyMachine = require(`./.cache/${process.env.NET_NAME}-${process.env.CANDY_MACHINE_NAME}.json`);

const { runCommand } = require("./utils/cmd");

const homeDir = os.homedir();
const gName = process.env.NFT_NAME;
const keyPairPath =
  process.cwd().replace(/\\/gi, "/") + process.env.SECRETKEY_PATH;
const rpcUrl = process.env.RPC_URL;
const imageDirUrl = process.env.METADATA_DIR_PATH + "/";

(async () => {
  let cmd = `metaboss derive cmv2-creator ${candyMachine.program.candyMachine} -r ${rpcUrl} -T 600`;

  console.log("Getting creator of candy machine...");
  let result = await runCommand(cmd);

  if (!result) {
    console.log("Error appeared when getting account");
    return;
  }

  const creator = result.match(/([A-Za-z0-9]{44})/)[0];

  console.log("Creator:", creator);

  cmd = `metaboss snapshot mints --creator ${creator} -o ./snapshot -r ${rpcUrl} -T 600`;
  console.log("Getting all mints...");
  result = await runCommand(cmd);

  cmd = `metaboss decode mint --list-file ./snapshot/${creator}_mint_accounts.json -o ./snapshot -T 600`;
  console.log("Decoding mints....");
  result = await runCommand(cmd);

  let revealedAccounts = require("./snapshot/revealed.json");
  const accounts = require(`./snapshot/${creator}_mint_accounts.json`);

  for (const account of accounts) {
    if (revealedAccounts.indexOf(account) >= 0) {
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
    }.json -T 600`;

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