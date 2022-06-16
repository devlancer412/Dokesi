require("dotenv").config();
const fs = require("fs");
const candyMachine = require(`./.cache/${process.env.NET_NAME}-${process.env.CANDY_MACHINE_NAME}.json`);

const { runCommand } = require("./utils/cmd");

const gName = process.env.NFT_NAME;
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

  let revealAccounts = require("./snapshot/reveal.json");
  const accounts = require(`./snapshot/${creator}_mint_accounts.json`);

  for (const account of accounts) {
    if (
      revealAccounts.filter(
        (revealAccount) => revealAccount.mint_account == account
      ).length
    ) {
      continue;
    }

    console.log("Fetching account:", account);

    const accountData = require(`./snapshot/${account}.json`);
    const number = accountData.name.substr(
      gName.length + 1,
      accountData.name.length - gName.length - 1
    );

    revealAccounts.push({
      mint_account: account,
      new_uri: imageDirUrl + number + ".json",
    });
  }

  let content = revealAccounts.reduce(
    (a, b) => (a += JSON.stringify(b) + ","),
    "["
  );
  content += "]";
  fs.writeFileSync(`./snapshot/reveal.json`, content, "utf8");
})();
