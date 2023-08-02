const { ethers } = require("hardhat");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);
const { expect } = chai;

const zeroAddress = '0x0000000000000000000000000000000000000000';

let erc20Contract, strandsContract, testContract;
let signer, to, tx;
let contractPath, contractFactory;

describe("transferEth method tests", () => {
    before(async () => {
        // Get Signer
        [signer, recipient] = await ethers.getSigners();
        provider = ethers.provider;

        // Deploy strandsContract contract
        contractPath = "src/contracts/Strands.sol:Strands";
        contractFactory = await ethers.getContractFactory(contractPath, signer);
        strandsContract = await contractFactory.deploy();

        // Display contract address
        console.log('------------------------------------------------------------------------');
        console.log('-- strands contract deployed at:\t', strandsContract.address);
        console.log('------------------------------------------------------------------------');
    });

    describe("transferEth method negative test", () => {
        it("Try to send eth to recipient with address zero", async () => {
            const to = zeroAddress;
            const amount = ethers.utils.parseEther("10");
            await expect(strandsContract.transferEth(to, { value: amount })).to.be.revertedWith("Recipient is zero address");
        });

        it("Try to send zero value", async () => {
            const to = recipient.address;
            const amount = 0;
            await expect(strandsContract.transferEth(to, { value: amount })).to.be.revertedWith("Zero value");
        });
    })

    describe("transferEth method positive test", () => {
        it("transfer 10 eth from signer to recipient account", async () => {
            const from = signer.address;
            const to = recipient.address;
            const amount = ethers.utils.parseEther("10");
            
            const from_balanceOf_before = await provider.getBalance(from);
            const to_BalanceOf_before = await provider.getBalance(to);

            tx = await strandsContract.transferEth(to, { value: amount });
            const tx_receipt = await tx.wait(1);

            const _gas = tx_receipt.cumulativeGasUsed;
            const _gasPrice = tx_receipt.effectiveGasPrice;
            const _gasPaid = _gas.mul(_gasPrice);

            const from_balanceOf_after = await provider.getBalance(from);
            const to_BalanceOf_after = await provider.getBalance(to);

            expect(from_balanceOf_after).to.be.equals(from_balanceOf_before.sub(amount.add(_gasPaid)));
            expect(to_BalanceOf_after).to.be.equals(to_BalanceOf_before.add(amount));
        });
    });
});