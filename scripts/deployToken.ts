// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseUnits } from "@ethersproject/units";
import { ethers } from "hardhat";

async function main() {
  const initialSupply = parseUnits("500000000", "ether");
  const deployer = await ethers.getSigner("0x1081fF8Bcb85C97Cb7Fa3EAc391642f5ED0248A3");

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("Current Gas Price:", (await deployer.getGasPrice()).toString());
  
  const Propeller = await ethers.getContractFactory("PropToken", deployer);
  const propeller = await Propeller.deploy("Propeller", "PROP", initialSupply, deployer.address);

  await propeller.deployed();

  console.log("Propeller deployed to:", propeller.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });