// importing the required modules
const { ethers } = require('ethers');
const bip39=require("bip39");

// Generate a random 12-word mnemonic phrase
const mnemonic = bip39.generateMnemonic(128);

// // Derive the master private key from the mnemonic phrase
 const seed = bip39.mnemonicToSeedSync(mnemonic);
 const masterKey = ethers.utils.HDNode.fromSeed(seed);


// Derive the first address and private key
const firstNode = masterKey.derivePath("m/44'/60'/0'/0/0");
const firstAddress = firstNode.address;
const firstPrivateKey = firstNode.privateKey;

// Derive the second address and private key
const secondNode = masterKey.derivePath("m/44'/60'/0'/0/1");
const secondAddress = secondNode.address;
const secondPrivateKey = secondNode.privateKey;

console.log("Mnemonic:", mnemonic);
console.log("Address 1:", firstAddress);
console.log("Private key 1:", firstPrivateKey);
console.log("Address 2:", secondAddress);
console.log("Private key 2:", secondPrivateKey);


// Check if the first address is valid
if (ethers.utils.isAddress(firstAddress)) {
  console.log("First address is valid:", firstAddress);
} else {
  console.log("First address is not valid:", firstAddress);
}

// Check if the second address is valid
if (ethers.utils.isAddress(secondAddress)) {
  console.log("Second address is valid:", secondAddress);
} else {
  console.log("Second address is not valid:", secondAddress);
}