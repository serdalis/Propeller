import { parseUnits } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { Propeller } from "../typechain-types/Propeller";

const ownerWallet = "0x1081fF8Bcb85C97Cb7Fa3EAc391642f5ED0248A3";
const propTokenAddress = "0xd75451AAA5aB5Bd864106a4d49aF06601d6c2dB3";

async function main() {
    const wallet = await ethers.getSigner(ownerWallet);
    const invester = await ethers.getSigner("0x71337F68f2F6BD2580BED73ebFE8ADc535c56915");

    await wallet.sendTransaction({ to: invester.address, value: parseUnits("0.0001", "ether")});
}

async function main2() {
    const rate = Math.round(1 / 0.000043);
    const amountGiven = parseUnits("3", "ether");
    const tokensToTransfer = amountGiven.mul(rate);

    const wallet = await ethers.getSigner(ownerWallet);
    const invester = await ethers.getSigner("0x71337F68f2F6BD2580BED73ebFE8ADc535c56915");

    const Propeller = await ethers.getContractFactory("Propeller", wallet);
    const propeller: PropToken = Propeller.attach(propTokenAddress) as PropToken;

    await propeller.transfer(invester.address, tokensToTransfer);
}
  
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
  