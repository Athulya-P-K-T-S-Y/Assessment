
const MyToken = require("../artifacts/contracts/MyToken.sol/MyToken.json");

//const MyToken=require("../ABI/MyToken")
const Web3=require("web3")
require('dotenv').config();


  
  getTokenBalance = async (tokenAddress, userAddress) => {
      let provider = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/2de122430cac4415abdc69ec89693c6a"));

        const contract = new provider.eth.Contract(MyToken.abi, tokenAddress);
          tokenBalance= await contract.methods.balanceOf(userAddress).call()
          console.log(tokenBalance)
          decimals=await contract.methods.decimals().call()
            const divider = Math.pow(10, decimals);
            const balance = tokenBalance / divider;
            console.log(balance);
      
}
getTokenBalance(process.env.TOKENADDRESS, process.env.USERADDRESS);
