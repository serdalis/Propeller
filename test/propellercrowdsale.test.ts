import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Propeller } from "../typechain-types/Propeller";
import { PropellerCrowdsale } from "../typechain-types/PropellerCrowdsale";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, ContractFactory } from "ethers";
import { parseUnits } from "ethers/lib/utils";

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Crowdsale contract", async function () {
    // token cost is 0.0001 eth for one.
    const rate = 1000;
    const initialSupply = parseUnits("500000000", "ether");
    const crowdsaleCap = parseUnits("500000", "ether");

    let PropellerCrowdsaleFactory;
    let propeller: Propeller;
    let propellerCrowdsale: PropellerCrowdsale;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    let addrs: SignerWithAddress[];

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        const PropellerFactory = await ethers.getContractFactory('Propeller');
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        propeller = await PropellerFactory.deploy('Propeller', 'ProP', initialSupply, owner.address) as Propeller;

        // Get the ContractFactory and Signers here.
        PropellerCrowdsaleFactory = await ethers.getContractFactory('PropellerCrowdsale', owner);
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        const blockNumBefore = await ethers.provider.getBlockNumber();
        const blockBefore = await ethers.provider.getBlock(blockNumBefore);

        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        propellerCrowdsale = await PropellerCrowdsaleFactory.deploy(
            rate,
            owner.address,
            propeller.address,
            100) as PropellerCrowdsale;
    });

    describe("Token Buying", function () {
        it("weiRaised should be 0 at start", async function () {
            const raised = await propellerCrowdsale.weiRaised();
            expect(raised).to.equal(0);
        });

        it("rate should be as initialised", async function () {
            const crowdsaleRate = await propellerCrowdsale.rate();
            expect(crowdsaleRate).to.equal(rate);
        });

        
        it("token should be correct", async function () {
            const crowdsaleToken = await propellerCrowdsale.token();
            expect(crowdsaleToken).to.equal(propeller.address);
        });

        it("weiRaised should increase when tokens bought", async function () {
            const etherValue = parseUnits("0.5", "ether");
            await propeller.transfer(propellerCrowdsale.address, crowdsaleCap);

            // Get owner balance after gas cost
            const ownerBalance = await owner.getBalance();

            await addr1.sendTransaction({to: propellerCrowdsale.address, value: etherValue});

            const buyerBalance = await propeller.balanceOf(addr1.address);
            const raised = await propellerCrowdsale.weiRaised();

            expect(buyerBalance).to.equal(etherValue.mul(rate));
            expect(await owner.getBalance()).to.equal(ownerBalance.add(etherValue))
            expect(raised).to.equal(etherValue);
        });
    });
});


describe("Crowdsale timed contract", async function () {
    // token cost is 0.0001 eth for one.
    const rate = 1000;
    const initialSupply = parseUnits("500000000", "ether");
    const crowdsaleCap = parseUnits("500000", "ether");

    const testEtherValue = parseUnits("0.5", "ether");

    let PropellerCrowdsaleFactory: ContractFactory;
    let propeller: Propeller;
    let propellerCrowdsale: PropellerCrowdsale;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    let addrs: SignerWithAddress[];

    const getCurrentBlockTime = async () => {
        const blockNumBefore = await ethers.provider.getBlockNumber();
        const blockBefore = await ethers.provider.getBlock(blockNumBefore);
        return blockBefore.timestamp;
    };

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        const PropellerFactory = await ethers.getContractFactory('Propeller');
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        propeller = await PropellerFactory.deploy('Propeller', 'ProP', initialSupply, owner.address) as Propeller;

        // Get the ContractFactory and Signers here.
        PropellerCrowdsaleFactory = await ethers.getContractFactory('PropellerCrowdsale', owner) as ContractFactory;
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    });

    describe("Token Buying", function () {
        it("Should deny buys after end", async function () {
            const currentTime = await getCurrentBlockTime();

            propellerCrowdsale = await PropellerCrowdsaleFactory.deploy(
                rate,
                owner.address,
                propeller.address,
                1) as PropellerCrowdsale;

            await sleep(3000);
            await expect(
                propellerCrowdsale.connect(addr2).buyTokens(addr2.address, {value: testEtherValue})
            ).to.be.revertedWith("Crowdsale: not open");
        });

        it("Should not send to pool when sale not ended", async function () {
            const currentTime = await getCurrentBlockTime();

            propellerCrowdsale = await PropellerCrowdsaleFactory.deploy(
                rate,
                owner.address,
                propeller.address,
                5) as PropellerCrowdsale;

            await expect(
                propellerCrowdsale.sendLeftoversToPool()
            ).to.be.revertedWith("Crowdsale: Can't send before sale end");
        });

        it("Should send to pool when sale ended", async function () {
            const currentTime = await getCurrentBlockTime();

            propellerCrowdsale = await PropellerCrowdsaleFactory.deploy(
                rate,
                owner.address,
                propeller.address,
                1) as PropellerCrowdsale;

            await sleep(2000);

            await propeller.transfer(propellerCrowdsale.address, crowdsaleCap);
            await propellerCrowdsale.sendLeftoversToPool();

            expect(await propeller.balanceOf(propellerCrowdsale.address)).to.equal(parseUnits("0", "ether"));
            expect(await propeller.balanceOf(owner.address)).to.equal(initialSupply);
        });

        it("Should allow buying tokens while open", async function () {
            propellerCrowdsale = await PropellerCrowdsaleFactory.deploy(
                rate,
                owner.address,
                propeller.address,
                100) as PropellerCrowdsale;

            await propeller.transfer(propellerCrowdsale.address, crowdsaleCap);

            // Get owner balance after gas cost
            const ownerBalance = await owner.getBalance();

            await sleep(1000);
            await propellerCrowdsale.connect(addr1).buyTokens(addr1.address, {value: testEtherValue});

            const buyerBalance = await propeller.balanceOf(addr1.address);
            const raised = await propellerCrowdsale.weiRaised();

            expect(buyerBalance).to.equal(testEtherValue.mul(rate));
            expect(await owner.getBalance()).to.equal(ownerBalance.add(testEtherValue))
            expect(raised).to.equal(testEtherValue);
        });
    });
});
