//SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/// @author David Gimenez: drgimenez@gmail.com
/// @notice This is the interface defined for the application to the job in Strands
contract ERC20_Token is ERC20 {

    constructor() ERC20("Test", "Test") {
        _mint(msg.sender, 10 ether);
    }

}