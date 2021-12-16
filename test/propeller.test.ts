import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Propeller } from "../typechain-types/Propeller";
import { expect } from "chai";
import { ethers } from "hardhat";
import { parseUnits } from "@ethersproject/units";

describe("Token contract", async function () {
    const initialSupply = parseUnits("500", "ether");

    let PropellerFactory;
    let propeller: Propeller;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    let addrs: SignerWithAddress[];

    const name = 'Propeller';
    const symbol = 'PROP';

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        PropellerFactory = await ethers.getContractFactory(name, owner);
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        propeller = await PropellerFactory.deploy(name, symbol, initialSupply, owner.address) as Propeller;
    });

    describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.
        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await propeller.balanceOf(owner.address);
            expect(await propeller.totalSupply()).to.equal(ownerBalance);
        });

        it('has the correct name', async function() {
            const name = await propeller.name();
            expect(name).to.equal(name);
        });
    
        it('has the correct symbol', async function() {
            const symbol = await propeller.symbol();
            expect(symbol).to.equal(symbol);
        });

        it('has the correct owner supplied', async function() {
            const balance = await propeller.balanceOf(owner.address);
            expect(balance).to.equal(initialSupply);
        });
    
        it('has the correct initial supply', async function() {
            const supply = await propeller.totalSupply();
            expect(supply).to.equal(initialSupply);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            // Transfer 50 tokens from owner to addr1
            await propeller.transfer(addr1.address, 50);
            const addr1Balance = await propeller.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            // Transfer 50 tokens from addr1 to addr2
            // We use .connect(signer) to send a transaction from another account
            await propeller.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await propeller.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            await propeller.transfer(addr1.address, 50);
            const initialOwnerBalance = await propeller.balanceOf(addr1.address);

            // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
            // `require` will evaluate false and revert the transaction.
            await expect(
                propeller.connect(addr1).transfer(owner.address, 51)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

            // Owner balance shouldn't have changed.
            expect(await propeller.balanceOf(addr1.address)).to.equal(initialOwnerBalance);
        });

        it("Should update balances after transfers", async function () {
            const initialOwnerBalance = await propeller.balanceOf(owner.address);

            // Transfer 100 tokens from owner to addr1.
            await propeller.transfer(addr1.address, 100);

            // Transfer another 50 tokens from owner to addr2.
            await propeller.transfer(addr2.address, 50);

            // Check balances.
            const finalOwnerBalance = await propeller.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance.add(-150));

            const addr1Balance = await propeller.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);

            const addr2Balance = await propeller.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });
    });
});