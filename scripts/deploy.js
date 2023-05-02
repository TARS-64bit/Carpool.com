// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const Carpool = await hre.ethers.getContractFactory("Carpool");
  const carpool = await Carpool.deploy();

  const [Deployer] = await ethers.getSigners();

  console.log("Deploying with account: " + Deployer.address);
  console.log(" Balance: " + (await Deployer.getBalance()).toString());

  await carpool.deployed();

  console.log(
    `Carpool deployed to ${carpool.address}`
  );


  const receipt = await carpool.deployTransaction.wait();
  
  
  const transactionReceipt = await ethers.provider.getTransactionReceipt(receipt.transactionHash);
const gasUsed = transactionReceipt.gasUsed;
const gasPricePaid = transactionReceipt.effectiveGasPrice;
const transactionFee = gasUsed.mul(gasPricePaid);
  console.log(`Transaction fee paid for contract deployment: ${ethers.utils.formatEther(transactionFee)} wei`);
  
    console.log(
  `Smart contract address: ${carpool.address}}`
  );
    
  console.log(`Transaction fee estimated for contract deployment: ${deploymentPriceRBTC} wei`);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
