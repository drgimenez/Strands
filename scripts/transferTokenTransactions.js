const fs    = require('fs');
const path  = require('path');

async function main() {

    console.log("---------------------------------------------------------------------------------------");
    console.log("-- Loading deployed contracts...");
    console.log("---------------------------------------------------------------------------------------");

    [signer] = await ethers.getSigners();

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

    // Approve operation
    const amount = ethers.utils.parseEther("1");
    tx = await erc20_TokenContractInstance.approve(strandsContractInstance.address, amount);
    await tx.wait(1);

    // Get token balance before tranfer
    const to = ethers.utils.getAddress("0xc7b7bcBFBae199382392BB8620c25A4f9b961583");
    const balanceOf_before_signer = await erc20_TokenContractInstance.balanceOf(signer.address);
    const balanceOf_before_to = await erc20_TokenContractInstance.balanceOf(to);

    console.log('-- Balance before transfer');
    console.log('------------------------------------------------------------------------');
    console.log('-- Signer balance:\t', ethers.utils.formatEther(balanceOf_before_signer));
    console.log('-- To balance:\t\t', ethers.utils.formatEther(balanceOf_before_to));
    console.log('------------------------------------------------------------------------');
    console.log('');

    tx = await strandsContractInstance.transferToken(erc20_TokenContractInstance.address, to, amount);
    await tx.wait(1);

    // Get token balance after tranfer
    const balanceOf_after_signer = await erc20_TokenContractInstance.balanceOf(signer.address);
    const balanceOf_after_to = await erc20_TokenContractInstance.balanceOf(to);

    console.log('-- Balance after transfer');
    console.log('------------------------------------------------------------------------');
    console.log('-- Signer balance:\t', ethers.utils.formatEther(balanceOf_after_signer));
    console.log('-- To balance:\t\t', ethers.utils.formatEther(balanceOf_after_to));
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