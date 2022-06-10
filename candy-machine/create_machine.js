require("dotenv").config();
const fs = require("fs");
const os = require("os");
const config = require("./config.json");
const bs58 = require("bs58");

const {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  getAccount,
  transfer,
} = require("@solana/spl-token");

const {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} = require("@solana/web3.js");

const { runCommand } = require("./utils/cmd");

const homeDir = os.homedir();
console.log(homeDir);

// const keypairPath = process.env.KEYPAIR_PATH.replace("~", homeDir);
const keypairPath = process.env.SECRETKEY_PATH;

const secretKey = new Uint8Array(require(keypairPath));
const whitelist = require(`./${process.env.WHITELIST_PATH}`);

const connection = new Connection(
  clusterApiUrl(process.env.CLUSTER_API_URL),
  "confirmed"
);
const payer = Keypair.fromSecretKey(secretKey);

console.log(bs58.encode(secretKey));

console.log("Connected to wallet:", payer.publicKey.toString());

const sleep = async (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

(async () => {
  try {
    ////////////////////////////////////////////////////////
    //This is only devnet
    // const airdropSignature = await connection.requestAirdrop(
    //   payer.publicKey,
    //   LAMPORTS_PER_SOL
    // );

    // await connection.confirmTransaction(airdropSignature);

    let valance = await connection.getBalance(payer.publicKey);
    console.log("Wallet balance is:", valance);

    //////////////////////////////////////////////////
    const mint = await createMint(connection, payer, payer.publicKey, null, 0);

    console.log("Created spl-token:", mint.toBase58());

    fs.writeFileSync(
      `${process.env.SPLTOKEN_PATH}`,
      `module.exports="${mint.toBase58()}"`
    );

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    console.log("Created account for mint:", tokenAccount.address.toString());

    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer.publicKey,
      3 * whitelist.length
    );

    const tokenAccountInfo = await getAccount(connection, tokenAccount.address);

    console.log(
      "Minted spl-token for presale:",
      tokenAccountInfo.amount.toString()
    );

    const tokenAccountsTo = await Promise.all(
      whitelist.map((address) =>
        getOrCreateAssociatedTokenAccount(
          connection,
          payer,
          mint,
          new PublicKey(address)
        )
      )
    );

    for (const account of tokenAccountsTo) {
      await transfer(
        connection,
        payer,
        tokenAccount.address,
        account.address,
        payer.publicKey,
        3
      );
    }
    // const distributeResult = await Promise.all(
    //   tokenAccountsTo.map((account) => {
    //     return transfer(
    //       connection,
    //       payer,
    //       tokenAccount.address,
    //       account.address,
    //       payer.publicKey,
    //       3
    //     );
    //   })
    // );

    const tokenAccountInfos = await Promise.all(
      tokenAccountsTo.map((account) => getAccount(connection, account.address))
    );

    tokenAccountInfos.map((accountInfo) =>
      console.log(accountInfo.amount.toString())
    );

    /// Setting config data
    config.price = parseFloat(process.env.MINT_PRICE);
    config.number = 1;
    config.goLiveDate = process.env.GOLIVE_DATE;
    config.endSettings.endSettingType.amount = true;
    config.endSettings.value = 1;
    config.solTreasuryAccount = process.env.TREASURY_ACCOUNT;
    config.whitelistMintSettings.mint = mint.toBase58();
    config.whitelistMintSettings.discountPrice = parseFloat(
      process.env.WHITELIST_PRICE
    );

    config.hiddenSettings.name = process.env.NFT_NAME;
    config.hiddenSettings.symbol = process.env.NFT_SYMBOL;
    config.hiddenSettings.uri = process.env.DEFAULT_METADATA_URL;
    config.hiddenSettings.hash = process.env.DEFAULT_HASH;
    config.goLiveDate = process.env.GOLIVE_DATE;

    await fs.writeFileSync("config_pre.json", JSON.stringify(config), "utf8");
    config.number = parseInt(process.env.MINT_NUMBER);
    config.endSettings.value = parseInt(process.env.MINT_NUMBER);
    await fs.writeFileSync("config_ultra.json", JSON.stringify(config), "utf8");

    const candyMachine =
      "ts-node ~/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts".replace(
        "~",
        homeDir
      );
    // Upload candy machine
    let cmd = `${candyMachine} upload -e ${process.env.CLUSTER_API_URL} -k ${keypairPath} -cp config_pre.json -c ${process.env.CANDY_MACHINE_NAME} ./assets_default`;

    console.log("Creating candy machine....");
    let result = await runCommand(cmd);

    console.log(result);
    // Update candy machine
    console.log("Updating candy machine....");
    cmd = `${candyMachine} update_candy_machine -e ${process.env.CLUSTER_API_URL} -k ${keypairPath} -cp config_ultra.json -c ${process.env.CANDY_MACHINE_NAME}`;

    result = await runCommand(cmd);

    console.log(result);

    console.log("Getting candy machine setting....");
    cmd = `${candyMachine} show -e ${process.env.CLUSTER_API_URL} -k ${keypairPath} -c ${process.env.CANDY_MACHINE_NAME}`;

    result = await runCommand(cmd);

    console.log(result);
  } catch (err) {
    console.log(err);
  }
})();
