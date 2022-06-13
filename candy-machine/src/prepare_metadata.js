require("dotenv").config();
const fs = require("fs");

const jsonDir = process.env.JSON_PATH;
console.log(jsonDir);

const files = fs.readdirSync(jsonDir);

if (!Array.isArray(files)) {
  console.log("There is an err");
}

const creators = [];
creators.push({
  address: process.env.TREASURY_ACCOUNT,
  share: 50,
});
creators.push({
  address: process.env.SECONDARY_TREASURY,
  share: 50,
});

for (file of files) {
  const filePath = jsonDir + "/" + file;
  const metaData = require(filePath);

  console.log(file);
  metaData.image =
    process.env.IMAGE_DIR_PATH + "/" + file.split(".")[0] + ".json";
  metaData.external_url = process.env.EXTERNAL_URL;
  metaData.properties.files.uri = metaData.image;
  metaData.properties.creators = creators;
  console.log(file + "->" + metaData.image);

  fs.writeFileSync(filePath, JSON.stringify(metaData), "utf8");
}
