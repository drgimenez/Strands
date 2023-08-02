# Strands
##### Author: David Gimenez Gutierrez

This is my sample repository for the admission test for the position "Senior Smart Contract Developer at Strands"

### Main project information

#### Deployed contract address on Sepolia testnet

* Strands contract address: 0x9240C980f1090e3bd54038bDe4D63e489C429cf6
* ![Link to the contract verified in EtherScan:](https://sepolia.etherscan.io/address/0x9240C980f1090e3bd54038bDe4D63e489C429cf6#code)

#### Folders

* src/contracts
    Contains the contracts used in the solution

* src/interfaces
    Contains the interface defined for the solution

* scripts
    Contains the deploy file to deploy the contract to blockchain networks

* test
    Contains the test files to test the defined functionalities

#### Files

* src/contracts/Strands.sol
    Contains the contract that implements the interface defined with the functions requested for the test. 
    Include a description in the comments.

* src/contracts/ERC20_Token.sol
    This contract inherits from the OpenZeppelin ERC20 contract to emulate the operation of a compatible ERC20 token, in order to test the functionalities requested for the test.

* src/interfaces/IStrands.sol
    Contains the interface defined with the functions requested for the test. Include a description in the comments.

* scripts/deploy.js
    Contains the script to deploy the contract to blockchain networks

* test/transferEth.test.js
    Contains the tests on the requested functionality "transferEth". 
    For these tests it was assumed that the amount to be transferred from the contract would be an amount received at the time of calling the function

* test/transferToken.test.js
    Contains the tests on the requested functionality "transferToken". 

### Used libraries

* @openzeppelin/contracts: ^4.9.3
* solidity-coverage: ^0.8.2
* chai: ^4.3.7,
* ethereum-waffle: ^4.0.10
* hardhat-contract-sizer: ^2.8.0
* @nomicfoundation/hardhat-verify: ^1.1.0

### Repository setup instructions

1. Install Visual Sutidio Code: https://code.visualstudio.com/

2. Install NodeJS that includes npm: https://nodejs.org/en/download/

3. Install Git that includes bash terminal: https://git-scm.com/download/win

4. **Recommended:** Set Git bush as you default terminal in VSCode
    * Open the command palette using Ctrl + Shift + P.
    * Type - Select Default Profile
    * Select Git Bash from the options

5. Install the following extensions in VSCode
    * Solidity - Nomic Foundation
    * Live Server - Ritwick Dey

7. Clone the repository in the local environment

8. Open project folder in VSCode

9. Install the project dependencies with the following commands
    * npm install

### Test coverage

The tests carried out cover 100% of the code lines

![Alt text](image.png)

Test run on virtual hardhat network:

![Alt text](image-1.png)
