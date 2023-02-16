const { expect } = require("chai");

describe("MyToken", function () {
  let MyToken, myToken, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.connect(owner).deploy();
    await myToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await myToken.balanceOf(owner.address);
      expect(await myToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Whitelist", function () {
    it("Should add an address to the whitelist", async function () {
      await myToken.addToWhitelist(addr1.address);
      expect(await myToken.isWhitelisted(addr1.address)).to.equal(true);
    });

    it("Should remove an address from the whitelist", async function () {
      await myToken.addToWhitelist(addr1.address);
      await myToken.removeFromWhitelist(addr1.address);
      expect(await myToken.isWhitelisted(addr1.address)).to.equal(false);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer tokens from owner to addr1
      await myToken.transfer(addr1.address, 1000);
      expect(await myToken.balanceOf(addr1.address)).to.equal(1000);

      // Transfer tokens from addr1 to addr2
      await myToken.connect(addr1).transfer(addr2.address, 100);
      expect(await myToken.balanceOf(addr2.address)).to.equal(100);
    });

    it("Should fail if recipient is not whitelisted", async function () {
      await expect(myToken.transfer(addr1.address, 100)).to.be.revertedWith("Address is not whitelisted");
    });

    it("Should fail if sender does not have enough tokens", async function () {
      const initialBalance = await myToken.balanceOf(owner.address);

      // Try to transfer more tokens than the sender has
      await expect(myToken.transfer(addr1.address, initialBalance.add(1))).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });
  });
});
