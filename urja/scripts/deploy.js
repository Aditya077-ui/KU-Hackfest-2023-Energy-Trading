const { ethers } = require("hardhat");

// scripts/deploy.js
async function main() {
  const FundTransfer = await ethers.getContractFactory('FundTransfer');
  const fundTransfer = await FundTransfer.deploy();

  await fundTransfer.deployed();

  console.log('FundTransfer deployed to:', fundTransfer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
