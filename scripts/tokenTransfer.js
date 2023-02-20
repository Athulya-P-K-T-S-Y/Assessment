const Web3 = require('web3');
const MyToken = require("../artifacts/contracts/MyToken.sol/MyToken.json");

const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/2de122430cac4415abdc69ec89693c6a"));


const contractAddress = process.env.TOKENADDRESS;
const fromAddress = process.env.USERADDRESS;
const toAddress = process.env.TOADDRESS;
const privateKey = process.env.PRIVATEKEY;
const amount = 100; // amount of tokens to transfer

const myTokenContract = new web3.eth.Contract(MyToken.abi, contractAddress);

const transfer = async () => {
  // check the token balance of the fromAddress first
  const balanceBefore = await myTokenContract.methods.balanceOf(fromAddress).call();
  console.log(`Balance before transfer: ${balanceBefore}`);

 // transfer the tokens
  const tx = {
    from: fromAddress,
    to: toAddress,
    gas: 200000,
    data: myTokenContract.methods.transfer(toAddress, amount).encodeABI(),
  };
//console.log(tx);
  // sign the transaction with the private key
  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  //console.log(signedTx);

  // send the signed transaction
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);

  // check the token balance of the fromAddress again to make sure it decreased
  const balanceAfter = await myTokenContract.methods.balanceOf(fromAddress).call();
  console.log(`Balance after transfer: ${balanceAfter}`);
 };

transfer();
