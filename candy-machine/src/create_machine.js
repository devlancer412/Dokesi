require("dotenv").config();
const fs = require("fs");
const os = require("os");
const config = require("../config.json");

const { runCommand } = require("../utils/cmd");

const homeDir = os.homedir().replace(/\\/gi, "/");

// const keypairPath = process.env.KEYPAIR_PATH.replace("~", homeDir);
const keypairPath =
  process.cwd().replace(/\\/gi, "/") + process.env.SECRETKEY_PATH;

(async () => {
  try {
    config.price = parseFloat(process.env.MINT_PRICE);
    config.number = 1;
    config.goLiveDate = process.env.GOLIVE_DATE;
    config.endSettings.endSettingType.amount = true;
    config.endSettings.value = 1;
    config.solTreasuryAccount = process.env.TREASURY_ACCOUNT;
    config.whitelistMintSettings.mint = process.env.SPL_TOKEN;
    config.whitelistMintSettings.discountPrice = parseFloat(
      process.env.WHITELIST_PRICE
    );
    config.whitelistMintSettings.presale = false;

    config.hiddenSettings.name = process.env.NFT_NAME;
    config.hiddenSettings.symbol = process.env.NFT_SYMBOL;
    config.hiddenSettings.uri = process.env.DEFAULT_METADATA_URL;
    config.hiddenSettings.hash = process.env.DEFAULT_HASH;
    config.goLiveDate = process.env.WHITELIST_GO_LIVE;

    await fs.writeFileSync("config_pre.json", JSON.stringify(config), "utf8");
    config.number = parseInt(process.env.MINT_NUMBER);
    config.endSettings.value = parseInt(process.env.MINT_NUMBER);
    await fs.writeFileSync("config_mid.json", JSON.stringify(config), "utf8");
    config.whitelistMintSettings.presale = true;
    config.goLiveDate = process.env.GOLIVE_DATE;
    await fs.writeFileSync("config_ultra.json", JSON.stringify(config), "utf8");

    const candyMachine =
      "ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts".replace(
        "~",
        homeDir
      );
    // Upload candy machine
    let cmd = `${candyMachine} upload -e ${process.env.NET_NAME} --rpc-url ${process.env.RPC_URL} -k ${keypairPath} -cp config_pre.json -c ${process.env.CANDY_MACHINE_NAME} ./assets_default`;

    console.log(cmd);
    console.log("Creating candy machine....");
    // let result = await runCommand(cmd);

    // console.log(result);
    // Update candy machine
    console.log("Updating candy machine....");
    cmd = `${candyMachine} update_candy_machine -e ${process.env.NET_NAME} --rpc-url ${process.env.RPC_URL} -k ${keypairPath} -cp config_mid.json -c ${process.env.CANDY_MACHINE_NAME}`;

    console.log(cmd);
    // result = await runCommand(cmd);

    // console.log(result);

    // console.log("Getting candy machine setting....");
    // cmd = `${candyMachine} show -e ${process.env.NET_NAMe} --rpc-url ${process.env.RPC_URL} -k ${keypairPath} -c ${process.env.CANDY_MACHINE_NAME}`;

    // result = await runCommand(cmd);

    // console.log(result);
  } catch (err) {
    console.log(err);
  }
})();
