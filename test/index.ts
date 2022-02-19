import { expect } from "chai";
import { ethers } from "hardhat";

describe("CoinFlip", function () {
  it("allow owner to deposit funds", async function () {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();

    await coinFlip.depositFunds({
      value: ethers.utils.parseEther('2'),
    });

    const { waffle } = require("hardhat");
    const provider = waffle.provider;
    const contractBalance = await provider.getBalance(coinFlip.address);

    expect(contractBalance).to.equal(ethers.utils.parseEther('2'));
  });

  it("allow owner to withdraw funds", async function () {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();

    await coinFlip.depositFunds({
      value: ethers.utils.parseEther('2'),
    });
    
    const { waffle } = require("hardhat");
    const provider = waffle.provider;

    let contractBalance = await provider.getBalance(coinFlip.address);
    expect(contractBalance).to.equal(ethers.utils.parseEther('2'));
    
    await coinFlip.withdrawFunds(ethers.utils.parseEther('1'));

    contractBalance = await provider.getBalance(coinFlip.address);
    expect(contractBalance).to.equal(ethers.utils.parseEther('1'));
  });

  it("only owner can deposit funds", async function () {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();

    const [owner, addr1] = await ethers.getSigners();

    await expect(coinFlip.connect(addr1).depositFunds({
      value: ethers.utils.parseEther('2'),
    })).to.be.revertedWith("Only for owner");
  });

  it("only owner can withdraw funds", async function () {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();

    await coinFlip.depositFunds({
      value: ethers.utils.parseEther('2'),
    });
    
    const [owner, addr1] = await ethers.getSigners();

    await expect(coinFlip.connect(addr1).withdrawFunds(ethers.utils.parseEther('1')))
      .to.be.revertedWith("Only for owner");;
  });

  it("Does not allow playing with low funds", async function () {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();

    await coinFlip.depositFunds({
      value: ethers.utils.parseEther('2'),
    });
    
    const [owner, addr1] = await ethers.getSigners();

    await expect(coinFlip.connect(addr1).play())
      .to.be.revertedWith("Not enough amount");

      expect(await coinFlip.getGameCount()).to.equal(0);
  });

  it("Does not allow playing with too much", async function () {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();

    await coinFlip.depositFunds({
      value: ethers.utils.parseEther('2'),
    });
    
    const [owner, addr1] = await ethers.getSigners();

    await expect(coinFlip.connect(addr1).play({value: ethers.utils.parseEther('1')}))
      .to.be.revertedWith("Amount bigger than max");

    expect(await coinFlip.getGameCount()).to.equal(0);
  });

  it("Play one game", async function () {
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();

    await coinFlip.depositFunds({
      value: ethers.utils.parseEther('2'),
    });
    
    const [owner, addr1] = await ethers.getSigners();

    var response = await coinFlip.connect(addr1).play({value: ethers.utils.parseEther('0.1')});
    const res = await response.wait();
    const eventArgs = res.events[0].args;
    // console.log("eventArgs.winner", eventArgs.winner);
    // console.log("eventArgs.winner", eventArgs.message);

    expect(await coinFlip.getGameCount()).to.equal(1);

    const { waffle } = require("hardhat");
    const provider = waffle.provider;
    const contractBalance = await provider.getBalance(coinFlip.address);
    // console.log("contractBalance", contractBalance);
    // console.log("contractBalance", ethers.utils.parseEther('1.91'));
    // console.log("contractBalance", ethers.utils.parseEther('2.1'));
    
    if(eventArgs.winner) {
      expect(contractBalance).to.equal(ethers.utils.parseEther('1.91'));
    } else {
      expect(contractBalance).to.equal(ethers.utils.parseEther('2.1'));
    }
  });
});
