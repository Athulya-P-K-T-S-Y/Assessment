// const MyToken=require("./artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json")
const MyToken=require("./ABI/MyToken")
const Web3=require("web3")
require('dotenv').config();


  
  getTokenBalance = async (tokenAddress, userAddress) => {
      let provider = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_PROVIDER_URL));

        const contract = new provider.eth.Contract(MyToken, tokenAddress);
          tokenBalance= await contract.methods.balanceOf(userAddress).call()
          console.log(tokenBalance)
          decimals=await contract.methods.decimals().call()
            const divider = Math.pow(10, decimals);
            const balance = tokenBalance / divider;
            console.log(balance);
      
}
getTokenBalance(process.env.TOKENADDRESS, process.env.USERADDRESS);
