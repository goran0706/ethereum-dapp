// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Token Contract
 * @dev ERC20 token with added features for voting, permit, burning, pausing, and ownership management
 */
contract Token is
    ERC20,
    ERC20Burnable,
    Pausable,
    Ownable,
    ERC20Permit,
    ERC20Votes
{
    constructor(
        uint256 premint
    ) ERC20("LuminaX", "LMX") ERC20Permit("LuminaX") {
        _mint(msg.sender, premint * 10 ** decimals());
    }

    /**
     * @dev Pause token transfers (can only be called by the owner)
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause token transfers (can only be called by the owner)
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Mint new tokens (can only be called by the owner)
     * @param to Address to which new tokens will be minted
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Hook that is called before any token transfer
     * Overrides `_beforeTokenTransfer` from Pausable
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    // The following functions are overrides required by Solidity.

    /**
     * @dev Hook that is called after any token transfer
     * Overrides `_afterTokenTransfer` from ERC20Votes and ERC20
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    /**
     * @dev Internal function to mint tokens
     * Overrides `_mint` from ERC20 and ERC20Votes
     */
    function _mint(
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    /**
     * @dev Internal function to burn tokens
     * Overrides `_burn` from ERC20 and ERC20Votes
     */
    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}
