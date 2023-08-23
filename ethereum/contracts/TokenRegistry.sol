// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TokenRegistry
 * @dev This contract allows the owner to manage a registry of tokens.
 */
contract TokenRegistry is Ownable {
    address[] private tokenRegistry; // Use private to encapsulate storage access

    event TokenAdded(address indexed token);
    event TokenRemoved(address indexed token);

    /**
     * @dev Imports tokens to the registry.
     * @param tokens The addresses of the tokens to be imported.
     */
    function registerTokens(address[] memory tokens) public onlyOwner {
        for (uint256 i = 0; i < tokens.length; i++) {
            addToken(tokens[i]);
            emit TokenAdded(tokens[i]);
        }
    }

    /**
     * @dev Adds a new token to the registry.
     * @param token The address of the token to be added.
     */
    function addToken(address token) public onlyOwner {
        require(token != address(0), "Invalid token");
        require(!isSupported(token), "Token already exists");
        tokenRegistry.push(token);
        emit TokenAdded(token);
    }

    /**
     * @dev Removes a token from the registry.
     * @param token The address of the token to be removed.
     */
    function removeToken(address token) public onlyOwner {
        require(isSupported(token), "Token not found");
        uint256 tokenIndex = getTokenIndex(token);

        // Swap with the last token and then remove
        uint256 lastIndex = tokenRegistry.length - 1;
        if (tokenIndex != lastIndex) {
            tokenRegistry[tokenIndex] = tokenRegistry[lastIndex];
        }
        tokenRegistry.pop();

        emit TokenRemoved(token);
    }

    /**
     * @dev Checks if a token is supported (exists) in the registry.
     * @param token The address of the token to be checked.
     * @return Whether the token is supported.
     */
    function isSupported(address token) public view returns (bool) {
        for (uint256 i = 0; i < tokenRegistry.length; i++) {
            if (tokenRegistry[i] == token) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Gets the count of tokens in the registry.
     * @return The count of registered tokens.
     */
    function getTokensCount() public view returns (uint256) {
        return tokenRegistry.length;
    }

    /**
     * @dev Gets the tokens in the registry.
     * @return The registered tokens.
     */
    function getTokens() public view returns (address[] memory) {
        return tokenRegistry;
    }

    /**
     * @dev Returns the index of a token in the registry.
     * @param token The address of the token.
     * @return The index of the token.
     */
    function getTokenIndex(address token) private view returns (uint256) {
        for (uint256 i = 0; i < tokenRegistry.length; i++) {
            if (tokenRegistry[i] == token) {
                return i;
            }
        }
        revert("Token not found");
    }
}
