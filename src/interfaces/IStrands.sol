//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @author David Gimenez: drgimenez@gmail.com
/// @notice This is the interface defined for the application to the job in Strands
interface IStrands {
    
    /// @notice Allows the transfer of tokens from an ERC20 compliant contract
    /// @dev Revert if 'amount' is zero, message "Zero amount"
    /// @dev Revert if 'recipient' address is zero address, message "Recipient is zero address"
    /// @dev Revert if 'tokenAddress' is not a contract, message "Not a contract"
    /// @dev Revert if the 'sender' did not approve this contract, message "Pending approval"
    /// @dev Revert if contract call fails, message "Contract call failed"
    /// @dev Revert if 'transferFrom' method fails, message "transferFrom operation failed"
    /// @param tokenAddress It is the address of the contract compatible with the ERC-20 token standard
    /// @param recipient It is the destination address of the tokens transfer
    /// @param amount It is the amount of tokens for the transfer operation
    function transferToken(address tokenAddress, address recipient, uint256 amount) external;
    
    /// @notice Allows the transfer of Ethers between two accounts
    /// It is understood that this method is for example only, so the method transfers the same ethers
    /// that it receives. 
    /// @dev This solution assumes that the recipient can handle ethers
    /// @dev Revert if 'recipient' address is zero address, message "Recipient is zero address"
    /// @dev Revert if 'msg.value' is zero, message "Zero value"
    /// @param recipient It is the destination address for the transfer of ethers.
    function transferEth(address payable recipient) external payable;
}