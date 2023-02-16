//const artifacts=require("../artifacts")
const MyToken = require("../artifacts/contracts/MyToken.sol/MyToken.json");

const { ethers } = require("hardhat");

//Script for retrieving the balance of tokens by passing an address:
async function getBalance() {
  const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; //address you want to check the balance
  const myToken = await ethers.getContractFactory("MyToken");
  const myTokenInstance = await myToken.deploy();
  const balance = await myTokenInstance.balanceOf(address);
  console.log(`The balance of ${address} is ${balance.toString()} MTK`);
}

//Script for showing the total supply and balance:
async function showTotalSupplyAndBalance() {
  const myToken = await ethers.getContractFactory("MyToken");
  const myTokenInstance = await myToken.deploy();
  const totalSupply = await myTokenInstance.totalSupply();
  const balance = await myTokenInstance.balanceOf("0x84b52579F05Dd73c44e7773719211f55686A065B"); //address of the contract owner
  console.log(`Total supply: ${totalSupply.toString()} MTK`);
  console.log(`Balance of the contract owner: ${balance.toString()} MTK`);
}

//Script for token transfer
async function transferTokens(to, amount) {
  const myToken = await ethers.getContractAt(MyToken.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3","0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  const tx = await myToken.transfer(to, amount);
  console.log(`Transfer transaction sent: ${tx.hash}`);
  await tx.wait();
  console.log(`Transfer successful!`);
}
transferTokens("0x204321b0e4612E8B2B540FA5176211f2F7D85f70", 1000);

//Script for updating whitelisted addresses:
async function addToWhitelist(address) {
  const myToken = await ethers.getContractFactory("MyToken");
  const tx = await myToken.addToWhitelist(address);
  console.log(`Add to whitelist transaction sent: ${tx.hash}`);
  await tx.wait();
  console.log(`${address} has been added to the whitelist!`);
}
//Script for updating whitelisted addresses:
async function removeFromWhitelist(address) {
  const myToken = await ethers.getContractFactory("MyToken");
  const tx = await myToken.removeFromWhitelist(address);
  console.log(`Remove from whitelist transaction sent: ${tx.hash}`);
  await tx.wait();
  console.log(`${address} has been removed from the whitelist!`);
}

addToWhitelist("0x1234567890123456789012345678901234567890");
removeFromWhitelist("0x1234567890123456789012345678901234567890");



//Script for retrieving whitelisted addresses:
async function getWhitelistedAddresses() {
  const myToken = await ethers.getContractFactory("MyToken");
  const whitelist = await myToken.getWhitelist();
  console.log("Whitelisted addresses:");
  whitelist.forEach((address) => console.log(address));
}




getBalance();
showTotalSupplyAndBalance();
transferTokens();
addToWhitelist();
removeFromWhitelist();
getWhitelistedAddresses();



