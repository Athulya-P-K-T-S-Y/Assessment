// const MyToken=require("./artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json")
const MyToken=require("./ABI/MyToken")
const Web3=require("web3")



  
  getTokenBalance = async (tokenAddress, userAddress) => {
      let provider = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/2de122430cac4415abdc69ec89693c6a"));

        const contract = new provider.eth.Contract(MyToken, tokenAddress);
          tokenBalance= await contract.methods.balanceOf(userAddress).call()
          console.log(tokenBalance)
          decimals=await contract.methods.decimals().call()
          
            const divider = Math.pow(10, decimals);
            const balance = tokenBalance / divider;
            console.log(balance);
      
}
getTokenBalance("0x29cCb8d3a2f0A3b31152aD4B2b693CcF1e95EB76","0x84b52579F05Dd73c44e7773719211f55686A065B");
