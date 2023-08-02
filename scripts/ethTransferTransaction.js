const fs    = require('fs');
const path  = require('path');

async function main() {

    console.log("---------------------------------------------------------------------------------------");
    console.log("-- Loading deployed contracts...");
    console.log("---------------------------------------------------------------------------------------");

    [signer] = await ethers.getSigners();
    provider = ethers.provider;

    // Get Strands contract instance
    const strandsContractAddress = process.env.StrandsCONTRACT;
    let contractToLoad = "Strands";
    let contractABIPath = path.resolve(process.cwd(), "artifacts/src/contracts/", contractToLoad) + ".sol/" + contractToLoad + ".json";;
    let contractArtifact = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
    let strandsContractInstance  = new ethers.Contract(strandsContractAddress, contractArtifact.abi, signer);

    // Get ERC20_Token contract instance
    const ERC20_TokenContractAddress = process.env.erc20CONTRACT;
    contractToLoad = "ERC20_Token";
    contractABIPath = path.resolve(process.cwd(), "artifacts/src/contracts/", contractToLoad) + ".sol/" + contractToLoad + ".json";;
    contractArtifact = JSON.parse(fs.readFileSync(contractABIPath, 'utf8'));
    let erc20_TokenContractInstance  = new ethers.Contract(ERC20_TokenContractAddress, contractArtifact.abi, signer);

    // Display contract address
    console.log('------------------------------------------------------------------------');
    console.log('-- Strands contract deployed at:\t', strandsContractInstance.address);
    console.log('-- ERC20_Token contract deployed at:\t', erc20_TokenContractInstance.address);
    console.log('------------------------------------------------------------------------');
    console.log();

    // Get eth balance before tranfer
    const to = ethers.utils.getAddress("0xc7b7bcBFBae199382392BB8620c25A4f9b961583");
    const balance_before_to = await provider.getBalance(to);

    console.log('-- Balance before transfer');
    console.log('------------------------------------------------------------------------');
    console.log('-- To balance:\t\t', ethers.utils.formatEther(balance_before_to));
    console.log('------------------------------------------------------------------------');
    console.log('');

    const amount = 1000;
    tx = await strandsContractInstance.transferEth(to, { value: amount });
    await tx.wait(1);

    // Get token balance after tranfer
    const balance_after_to = await provider.getBalance(to);

    console.log('-- Balance after transfer');
    console.log('------------------------------------------------------------------------');
    console.log('-- To balance:\t\t', ethers.utils.formatEther(balance_after_to));
    console.log('------------------------------------------------------------------------');
    console.log('');

    console.log('-- Transaction hash:\t', tx.hash);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });