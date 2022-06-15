require("dotenv").config();
const fs = require("fs");

const jsonDir = "." + process.env.JSON_PATH;
console.log(jsonDir);

const files = fs.readdirSync(jsonDir);

if (!Array.isArray(files)) {
  console.log("There is an err");
}

const creators = [];
creators.push({
  address: process.env.TREASURY_ACCOUNT,
  share: 100,
});

for (file of files) {
  const filePath = "." + process.env.JSON_PATH + "/" + file;
  const metaData = JSON.parse(fs.readFileSync(filePath));

  console.log(filePath);
  metaData.image =
    process.env.IMAGE_DIR_PATH + "/" + file.split(".")[0] + ".png";
  metaData.external_url = process.env.EXTERNAL_URL;
  metaData.properties.files.uri = metaData.image;
  metaData.properties.creators = creators;
  console.log(file + "->" + metaData.image);

  fs.writeFileSync(filePath, JSON.stringify(metaData), "utf8");
}
