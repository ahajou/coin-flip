// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [deployer, addr1, addr2] = await ethers.getSigners();

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const CoinFlip = await ethers.getContractFactory("CoinFlip");
  const coinFlip = await CoinFlip.deploy();

  await coinFlip.deployed();

  console.log("CoinFlip deployed to:", coinFlip.address);
  
  const { waffle } = require("hardhat");
  const provider = waffle.provider;

  let contractBalance = await provider.getBalance(coinFlip.address);
  console.log("Constract balance before deposit:", contractBalance);
  
  console.log("");

  await coinFlip.depositFunds({
    value: ethers.utils.parseEther('2'),
  });

  contractBalance = await provider.getBalance(coinFlip.address);
  console.log("Constract balance after deposit:", contractBalance);
  
  console.log("");

  let response = await coinFlip.connect(addr1).play({value: ethers.utils.parseEther('0.1')});
  let eventArgs = (await response.wait()).events[0].args;
  console.log("First game winning: ", eventArgs.winner);
  console.log("First game message", eventArgs.message);
  console.log("--------");

  response = await coinFlip.connect(addr1).play({value: ethers.utils.parseEther('0.1')});
  eventArgs = (await response.wait()).events[0].args;
  console.log("Second game winning: ", eventArgs.winner);
  console.log("Second game message", eventArgs.message);
  console.log("--------");

  response = await coinFlip.connect(addr2).play({value: ethers.utils.parseEther('0.1')});
  eventArgs = (await response.wait()).events[0].args;
  console.log("Third game winning: ", eventArgs.winner);
  console.log("Third game message", eventArgs.message);
  console.log("--------");
  
  console.log("");

  contractBalance = await provider.getBalance(coinFlip.address);
  console.log("Constract balance after deposit:", contractBalance);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
