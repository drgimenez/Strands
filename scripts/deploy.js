async function main() {

    console.log("---------------------------------------------------------------------------------------");
    console.log("-- Deploy contracts process start...");
    console.log("---------------------------------------------------------------------------------------");

    [signer] = await ethers.getSigners();

    // Deploy contract
    const contractPath = "src/contracts/Strands.sol:Strands";
    const contractFactory = await ethers.getContractFactory(contractPath, signer);
    const StrandsContract = await contractFactory.deploy();

    // Display contract address
    console.log('------------------------------------------------------------------------');
    console.log('-- Strands contract deployed at:\t', StrandsContract.address);
    console.log('------------------------------------------------------------------------');
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });