//importing the required modules
const MyToken = require("../artifacts/contracts/MyToken.sol/MyToken.json");
const Web3=require("web3")
require('dotenv').config();



  getTokenBalance = async (tokenAddress, userAddress) => {
      let provider = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/2de122430cac4415abdc69ec89693c6a"));
        const contract = new provider.eth.Contract(MyToken.abi, tokenAddress);
          tokenBalance= await contract.methods.balanceOf(userAddress).call()
          console.log(tokenBalance)
         
      
}
getTokenBalance(process.env.TOKENADDRESS, process.env.USERADDRESS);
