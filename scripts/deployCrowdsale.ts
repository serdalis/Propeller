// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseUnits } from "@ethersproject/units";
import { ethers } from "hardhat";
import { Propeller } from "../typechain-types/Propeller";
import { PropellerCrowdsale } from "../typechain-types/PropellerCrowdsale";

// get how many token wei we obtain per ether wei, we inverse for easy reading.
const rate = 1 / 0.00043;
const crowdsaleTokenCount = parseUnits("500000", "ether");
const ownerWallet = "0x1081fF8Bcb85C97Cb7Fa3EAc391642f5ED0248A3";
const propellerAddress = "0xd75451AAA5aB5Bd864106a4d49aF06601d6c2dB3";

async function main() {
  const deployer = await ethers.getSigner(ownerWallet);

  console.log("Deploying contracts with the account:", deployer.address);
  
  const Propeller = await ethers.getContractFactory("Propeller", deployer);
  const propeller: Propeller = Propeller.attach(propellerAddress) as Propeller;
  
  const blockNumBefore = await ethers.provider.getBlockNumber();
  const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  const timestampBefore = blockBefore.timestamp;

  const PropellerCrowdsale = await ethers.getContractFactory("PropellerCrowdsale", deployer);
  const propellerCrowdsale: PropellerCrowdsale = await PropellerCrowdsale.deploy(
    rate,
    deployer.address,
    propeller.address,
    timestampBefore + 60,
    timestampBefore + 3600) as PropellerCrowdsale;

  await propellerCrowdsale.deployed();

  console.log("PropellerCrowdsale deployed to:", propeller.address);
  console.log("PropellerCrowdsale Tokens", propeller.balanceOf(propeller.address));
  console.log("PropellerCrowdsale Opening Time", propellerCrowdsale.openingTime());
  console.log("PropellerCrowdsale Closing Time", propellerCrowdsale.closingTime());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
