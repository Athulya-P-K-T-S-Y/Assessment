require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const INFURA_PROVIDER_URL = process.env.INFURA_PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      chainId: 5,
      blockConfirmations: 6,
      url: INFURA_PROVIDER_URL,
      accounts: [PRIVATE_KEY],
    },
    localhost: {
      chainId: 31337,
    },
  },
  etherscan: {
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
    },
  },
  contractSizer: {
    runOnCompile: false,
    only: ["MyToken"],
  },

  solidity: "0.8.17",
};














