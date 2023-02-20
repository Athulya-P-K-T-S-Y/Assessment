// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the OpenZeppelin ERC20 and Ownable contracts
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Defining the MyToken contract which extends ERC20 and Ownable
contract MyToken is ERC20, Ownable {
    mapping(address => bool) private _whitelist; //mapping to keep track of whitelisted addresses

    // Defining a modifier to check if an address is whitelisted
    modifier  onlyWhitelisted(address account) {
        require(_whitelist[account], "Address is not whitelisted");
        _;
    }

    // Defining the constructor which sets the total supply and mints it to the contract owner
    constructor() ERC20("MyToken", "MTK") {
        uint256 initialSupply = 10_000_000 * (10 ** decimals());
        _mint(msg.sender, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
    //Function for the contract owner to add an address to the whitelist
    function addToWhitelist(address account) public onlyOwner {
        _whitelist[account] = true;
    }

    //Function for the contract owner to remove an address from the whitelist
    function removeFromWhitelist(address account) public onlyOwner {
        _whitelist[account] = false;
    }

    // Function for the contract owner to update the whitelisted addresses list
    function updateWhitelistedAddresses(address[] memory accounts) public onlyOwner {
        for (uint i = 0; i < accounts.length; i++) {
            _whitelist[accounts[i]] = true;
        }
    }

    // Function to check if an address is whitelisted
    function isWhitelist(address account) public view returns (bool) {
        return _whitelist[account];
    }

    // Override the transfer function from ERC20 to check if the recipient address is whitelisted
    function transfer(address recipient, uint256 amount) public virtual override  onlyWhitelisted(recipient) returns (bool) {
        return super.transfer(recipient, amount);
    }
}


