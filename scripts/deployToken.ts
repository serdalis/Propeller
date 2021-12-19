// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { parseUnits } from "@ethersproject/units";
import { ethers } from "hardhat";
import { LedgerSigner } from "@ethersproject/hardware-wallets";    

async function main() {


  const initialSupply = parseUnits("500000000", "ether");
  const deployer = await ethers.getSigner("0xb4aDb85f25618523A828AfB2133eb9582B716064");
  
  const Propeller = await ethers.getContractFactory("Propeller", deployer);
  const ledger = await new LedgerSigner(Propeller.signer.provider, "hid", "m/44'/1'/0'/0");                                                                                                                              
  const PropellerHardware = await Propeller.connect(ledger)
  
  console.log("Deploying contracts with the account:", await Propeller.signer.getAddress());
  console.log("Account balance:", (await Propeller.signer.getBalance()).toString());
  console.log("Current Gas Price:", (await Propeller.signer.getGasPrice()).toString());

  const propeller = await PropellerHardware.deploy("Propeller", "PROP", initialSupply, Propeller.signer.getAddress());

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