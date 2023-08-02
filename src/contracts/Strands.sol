//SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "src/interfaces/IStrands.sol";

/// @author David Gimenez: drgimenez@gmail.com
/// @notice This is the contract that implements the interface defined for the application to the job in Strands
contract Strands is IStrands {
    
    /// @notice Allows the transfer of tokens from an ERC20 compliant contract
    /// @dev Revert if 'amount' is zero, message "Zero amount"
    /// @dev Revert if 'recipient' address is zero address, message "Recipient is zero address"
    /// @dev Revert if 'tokenAddress' is not a contract, message "Not a contract"
    /// @dev Revert if the 'sender' did not give enough allowance, message "Insufficient allowance"
    /// @dev Revert if 'transferFrom' method fails, message "transferFrom operation failed"
    /// @dev Revert if contract call fails with returned message
    /// @param tokenAddress It is the address of the contract compatible with the ERC-20 token standard
    /// @param recipient It is the destination address of the tokens transfer
    /// @param amount It is the amount of tokens for the transfer operation
    function transferToken(address tokenAddress, address recipient, uint256 amount) external {
        require(amount > 0, "Zero amount");
        require(recipient != address(0), "Recipient is zero address");
        require(_isSmartContract(tokenAddress), "Not a contract");
        require(IERC20(tokenAddress).allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");   
        
        try IERC20(tokenAddress).transferFrom(msg.sender, recipient, amount) returns (bool _result) {
            if (!_result) {
                revert ("transferFrom operation failed");
            }
        }
        catch Error(string memory _errorMessage) {
            revert(_errorMessage);
        }
    }
    
    /// @notice Allows the transfer of Ethers between two accounts
    /// It is understood that this method is for example only, so the method transfers the same ethers
    /// that it receives. 
    /// @dev This solution assumes that the recipient can handle ethers
    /// @dev Revert if 'recipient' address is zero address, message "Recipient is zero address"
    /// @dev Revert if 'msg.value' is zero, message "Zero value"
    /// @param recipient It is the destination address for the transfer of ethers.
    function transferEth(address payable recipient) external payable {
        require(recipient != address(0), "Recipient is zero address");
        require(msg.value > 0, "Zero value");

        recipient.transfer(msg.value);
    }

    /// ------------------------------------------------------------------------------------------------------------------------------------
    /// PRIVATE FUNCTIONS
    /// ------------------------------------------------------------------------------------------------------------------------------------

    function _isSmartContract(address _address) private view returns (bool) {
        bytes32 zeroAccountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
        bytes32 codeHash;
        assembly {
            codeHash := extcodehash(_address)
        }
        return (codeHash != zeroAccountHash && codeHash != 0x0);
    }
}