

require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const {API_URL, PRIVATE_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */



module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      viaIR: true,
    },
  },
  networks:{
    hardhat:{
      chainId: 1337
    },
    sepolia:{
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  paths:{
    artifacts: "./src/artifacts"
  }
};


