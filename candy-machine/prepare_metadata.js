require("dotenv").config();
const fs = require("fs");

const jsonDir = process.env.JSON_PATH;
console.log(jsonDir);

const files = fs.readdirSync(jsonDir);

if (!Array.isArray(files)) {
  console.log("There is an err");
}

for (file of files) {
  const filePath = jsonDir + "/" + file;
  const metaData = require(filePath);

  metaData.image = process.env.IMAGE_DIR_PATH + metaData.image;
  metaData.external_url = metaData.image;
  metaData.properties.files.uri = metaData.image;
  console.log(file + "->" + metaData.image);

  fs.writeFileSync(filePath, JSON.stringify(metaData), "utf8");
}
