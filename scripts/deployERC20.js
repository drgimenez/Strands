async function main() {

    console.log("---------------------------------------------------------------------------------------");
    console.log("-- Deploy contracts process start...");
    console.log("---------------------------------------------------------------------------------------");

    [signer] = await ethers.getSigners();

    // Deploy contract
    const contractPath = "src/contracts/ERC20_Token.sol:ERC20_Token";
    const contractFactory = await ethers.getContractFactory(contractPath, signer);
    const ERC20_TokenContract = await contractFactory.deploy();

    // Display contract address
    console.log('------------------------------------------------------------------------');
    console.log('-- ERC20_Token contract deployed at:\t', ERC20_TokenContract.address);
    console.log('------------------------------------------------------------------------');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });