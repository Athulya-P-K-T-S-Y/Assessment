const Web3 = require('web3');
//const MyToken = require('./MyToken.json');
const MyToken = require("../artifacts/contracts/MyToken.sol/MyToken.json");


require('dotenv').config();

const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/2de122430cac4415abdc69ec89693c6a'));

const tokenContract = new web3.eth.Contract(MyToken.abi, process.env.TOKENADDRESS);

const updateWhitelistedAddresses = async (addresses) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await tokenContract.methods.updateWhitelistedAddresses(addresses).estimateGas({ from: sender });

    const tx = {
      from: sender,
      to: process.env.TOKENADDRESS,
      gas: gasLimit,
      gasPrice: gasPrice,
      data: tokenContract.methods.updateWhitelistedAddresses(addresses).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the function to update the whitelisted addresses
updateWhitelistedAddresses(['0x3079be9d8622173f02618ba2b793f00795d4f320', '0x91a5d806ba73d0aa4bfa9b318126dde60582e92a']); // replace with the desired list of addresses
