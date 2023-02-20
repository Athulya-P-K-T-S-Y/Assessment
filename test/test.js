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
    const expectedSupply = 10_000_000 * 10 ** 6; // 10 million tokens with 6 decimal places
    const ownerBalance = await myToken.balanceOf(owner.address);
    expect(ownerBalance.toNumber()).to.equal(expectedSupply);
  });
});

describe("Whitelist", function () {
  it("Should allow the owner to add an address to the whitelist", async function () {
    await myToken.addToWhitelist(addr1.address);
    expect(await myToken.isWhitelist(addr1.address)).to.equal(true);
  });

  it("Should allow the owner to remove an address from the whitelist", async function () {
    await myToken.addToWhitelist(addr1.address);
    expect(await myToken.isWhitelist(addr1.address)).to.equal(true);

    await myToken.removeFromWhitelist(addr1.address);
    expect(await myToken.isWhitelist(addr1.address)).to.equal(false);
  });

  it("Should allow the owner to update the whitelisted addresses list", async function () {
    const newWhitelist = [        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"      ];
    await myToken.updateWhitelistedAddresses(newWhitelist);
    expect(await myToken.isWhitelist(newWhitelist[0])).to.equal(true);
    expect(await myToken.isWhitelist(newWhitelist[1])).to.equal(true);
    expect(await myToken.isWhitelist(newWhitelist[2])).to.equal(true);
  });
  
});

  describe("Transfers", function () {
    it("Should transfer tokens to a whitelisted recipient", async function () {
      const amount = 1000;
      await myToken.addToWhitelist(addr1.address);
      await myToken.connect(owner).transfer(addr1.address, amount);
      const addr1Balance = await myToken.balanceOf(addr1.address);
      expect(addr1Balance.toNumber()).to.equal(amount);
    });
  
  })
 });
