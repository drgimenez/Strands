require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('solidity-coverage');
require("@nomicfoundation/hardhat-verify");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.21",
  paths: {
    sources: "./src",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    sepolia: {
        chainId:  11155111,
        timeout:  20000,
        gasPrice: 8000000000,
        gas:      "auto",
        name:     "Sepolia",		
		url:      process.env.SEPOLIA_ACCESSPOINT_URL,
		from:     process.env.SEPOLIA_ACCOUNT,
        accounts: [process.env.SEPOLIA_PRIVATE_KEY]
	  }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_APIKEY
  }
};