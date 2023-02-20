const Web3 = require('web3');
const MyToken = require('../artifacts/contracts/MyToken.sol/MyToken.json');

require('dotenv').config();

const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/2de122430cac4415abdc69ec89693c6a'));

const tokenContract = new web3.eth.Contract(MyToken.abi, process.env.TOKENADDRESS);

const getWhitelistedAddresses = async () => {
  try {
    const whitelist = await tokenContract.methods._whitelist().call();
    console.log('Whitelisted addresses:', whitelist);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the function to retrieve the whitelisted addresses
getWhitelistedAddresses();
