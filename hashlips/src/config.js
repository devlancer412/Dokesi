const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.sol;

// General metadata for Ethereum
const namePrefix = "Dokesi";
const description =
  "Dokesi is a PFP inspired by short film animation, with rich and unique rare features, dozens of rare avatars, costumes, and color schemes.";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "DKS",
  seller_fee_basis_points: 1000,
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "BA4cUKFfA243hxdE9BGHWQhsuYxFwjA5KZZC6yR9cEVu",
      share: 50,
    },
    {
      address: "n8MrDdXmVTVTcvEU1zoKnZnaH2o5GJCmEEHUgU5pN2U",
      share: 50,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    // common male
    growEditionSizeTo: 3480,
    layersOrder: [
      { name: "background" },
      { name: "Special" },
      { name: "Skin" },
      {
        name: "male clothing",
        options: {
          displayName: "Clothing",
        },
      },
      { name: "Eye" },
      { name: "Mouth" },
      {
        name: "male props",
        options: {
          displayName: "Props",
        },
      },
      {
        name: "male hair",
        options: {
          displayName: "Hair",
        },
      },
      { name: "Hand" },
    ],
  },
  {
    // common female
    growEditionSizeTo: 6960,
    layersOrder: [
      { name: "background" },
      { name: "Special" },
      { name: "Skin" },
      {
        name: "female clothing",
        options: {
          displayName: "Clothing",
        },
      },
      { name: "Eye" },
      { name: "Mouth" },
      {
        name: "female props",
        options: {
          displayName: "Props",
        },
      },
      {
        name: "female hair",
        options: {
          displayName: "Hair",
        },
      },
      { name: "Hand" },
    ],
  },
  {
    // gold male
    growEditionSizeTo: 7360,
    layersOrder: [
      { name: "background" },
      { name: "Special" },
      { name: "Skin" },
      {
        name: "gold male clothing",
        options: {
          displayName: "Clothing",
        },
      },
      {
        name: "gold eye",
        options: {
          displayName: "Eye",
        },
      },
      { name: "Mouth" },
      {
        name: "gold male props",
        options: {
          displayName: "Props",
        },
      },
      {
        name: "gold male hair",
        options: {
          displayName: "Hair",
        },
      },
      {
        name: "gold hand",
        options: {
          displayName: "Hand",
        },
      },
    ],
  },
  {
    // gold female
    growEditionSizeTo: 7760,
    layersOrder: [
      { name: "background" },
      { name: "Special" },
      { name: "Skin" },
      {
        name: "gold female clothing",
        options: {
          displayName: "Clothing",
        },
      },
      {
        name: "gold eye",
        options: {
          displayName: "Eye",
        },
      },
      { name: "Mouth" },
      {
        name: "gold female props",
        options: {
          displayName: "Props",
        },
      },
      {
        name: "gold female hair",
        options: {
          displayName: "Hair",
        },
      },
      {
        name: "gold hand",
        options: {
          displayName: "Hand",
        },
      },
    ],
  },
  {
    // zombie male
    growEditionSizeTo: 7880,
    layersOrder: [
      { name: "background" },
      { name: "Special" },
      {
        name: "zombie skin",
        options: {
          displayName: "Skin",
        },
      },
      {
        name: "zombie female clothing",
        options: {
          displayName: "Clothing",
        },
      },
      {
        name: "female props",
        options: {
          displayName: "Props",
        },
      },
      {
        name: "female hair",
        options: {
          displayName: "Hair",
        },
      },
      {
        name: "zombie hand",
        options: {
          displayName: "Hand",
        },
      },
    ],
  },
  {
    // zombie female
    growEditionSizeTo: 8000,
    layersOrder: [
      { name: "background" },
      { name: "Special" },
      {
        name: "zombie skin",
        options: {
          displayName: "Skin",
        },
      },
      {
        name: "zombie male clothing",
        options: {
          displayName: "Clothing",
        },
      },
      {
        name: "zombie hand",
        options: {
          displayName: "Hand",
        },
      },
      {
        name: "male props",
        options: {
          displayName: "Props",
        },
      },
      {
        name: "male hair",
        options: {
          displayName: "Hair",
        },
      },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 2450,
  height: 2450,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
