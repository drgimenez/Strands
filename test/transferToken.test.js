const { ethers } = require("hardhat");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);
const { expect } = chai;

const zeroAddress = '0x0000000000000000000000000000000000000000';

let erc20Contract, strandsContract, testContract;
let signer, to, tx;
let contractPath, contractFactory;

describe("transferToken method tests", () => {
    before(async () => {
        // Get Signer
        [signer, recipient] = await ethers.getSigners();

        // Deploy ERC20 contract
        contractPath = "src/contracts/ERC20_Token.sol:ERC20_Token";
        contractFactory = await ethers.getContractFactory(contractPath, signer);
        erc20Contract = await contractFactory.deploy();

        // Deploy strandsContract contract
        contractPath = "src/contracts/Strands.sol:Strands";
        contractFactory = await ethers.getContractFactory(contractPath, signer);
        strandsContract = await contractFactory.deploy();

        // Display contract address
        console.log('------------------------------------------------------------------------');
        console.log('-- ERC20 contract deployed at:\t', erc20Contract.address);
        console.log('-- strands contract deployed at:\t', strandsContract.address);
        console.log('------------------------------------------------------------------------');
    });

    describe("Initialization test", () => {
        it("Signer balance test", async () => {
            const expected_balance = ethers.utils.parseEther("10");
            const received_balance = await erc20Contract.balanceOf(signer.address);
            expect(received_balance).to.be.equals(expected_balance);
            
        });
    });

    describe("transferToken method negative test", () => {
        it("Try send zero amount", async () => {
            const tokenAddress = erc20Contract.address;
            const to = recipient.address;
            const amount = 0;
            await expect(strandsContract.transferToken(tokenAddress, to, amount)).to.be.revertedWith("Zero amount");
        });

        it("Try send zero address as recipient", async () => {
            const tokenAddress = erc20Contract.address;
            const to = zeroAddress;
            const amount = ethers.utils.parseEther("1");
            await expect(strandsContract.transferToken(tokenAddress, to, amount)).to.be.revertedWith("Recipient is zero address");
        });

        it("Try to send tokens, through not a contract account", async () => {
            const tokenAddress = recipient.address;
            const to = recipient.address;
            const amount = ethers.utils.parseEther("1");
            await expect(strandsContract.transferToken(tokenAddress, to, amount)).to.be.revertedWith("Not a contract");
        });

        it("Try send tokens with Insufficient allowance", async () => {
            const tokenAddress = erc20Contract.address;
            const to = recipient.address;
            const amount = ethers.utils.parseEther("1");
            await expect(strandsContract.transferToken(tokenAddress, to, amount)).to.be.revertedWith("Insufficient allowance");
        });

        it("Try send more tokens than balance", async () => {
            const tokenAddress = erc20Contract.address;
            const to = recipient.address;
            const amount = ethers.utils.parseEther("1001");

            tx = await erc20Contract.approve(strandsContract.address, amount);
            await tx.wait(1);

            await expect(strandsContract.transferToken(tokenAddress, to, amount)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
        });
    })

    describe("transferToken method positive test", () => {
        it("transfer 1 token from signer to recipient account", async () => {
            const tokenAddress = erc20Contract.address;
            const to = recipient.address;
            const amount = ethers.utils.parseEther("1");
            const from = signer.address;

            const from_balanceOf_before = await erc20Contract.balanceOf(from);
            const to_BalanceOf_before = await erc20Contract.balanceOf(to);

            tx = await erc20Contract.approve(strandsContract.address, amount);
            await tx.wait(1);

            tx = await strandsContract.transferToken(tokenAddress, to, amount);
            await tx.wait(1);

            const from_balanceOf_after = await erc20Contract.balanceOf(from);
            const to_BalanceOf_after = await erc20Contract.balanceOf(to);

            expect(from_balanceOf_after).to.be.equals(from_balanceOf_before.sub(amount));
            expect(to_BalanceOf_after).to.be.equals(to_BalanceOf_before.add(amount));
        });
    });
});