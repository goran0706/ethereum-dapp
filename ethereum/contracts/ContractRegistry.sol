// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Contract Registry
 * @dev Allows the owner to register and retrieve contract addresses by names
 */
contract ContractRegistry is Ownable {
    event ContractRegistered(bytes32 indexed name, address destination);

    mapping(bytes32 => address) public registeredContracts;

    /**
     * @dev Register multiple contract addresses with corresponding names
     * @param _names Names of the contracts
     * @param _destinations Addresses of the contracts
     */
    function registerContracts(
        bytes32[] calldata _names,
        address[] calldata _destinations
    ) external onlyOwner {
        require(_names.length == _destinations.length, "Invalid array lengths");

        for (uint256 i = 0; i < _names.length; i++) {
            registeredContracts[_names[i]] = _destinations[i];
            emit ContractRegistered(_names[i], _destinations[i]);
        }
    }

    /**
     * @dev Get the address of a registered contract by name
     * @param _name Name of the contract
     * @return The address of the registered contract
     */
    function getAddress(bytes32 _name) external view returns (address) {
        return registeredContracts[_name];
    }

    /**
     * @dev Require and get the address of a registered contract by name
     * @param _name Name of the contract
     * @return The address of the registered contract
     */
    function requireAndGetAddress(bytes32 _name) public view returns (address) {
        address _foundAddress = registeredContracts[_name];
        require(_foundAddress != address(0), "Contract not registered");
        return _foundAddress;
    }

    /**
     * @dev Get the address of a registered contract by name (string version)
     * @param _name Name of the contract
     * @return The address of the registered contract
     */
    function getAddressByString(
        string memory _name
    ) public view returns (address) {
        bytes32 nameBytes = stringToBytes32(_name);
        return registeredContracts[nameBytes];
    }

    /**
     * @dev Convert a string to bytes32
     * @param _string String to be converted
     * @return result bytes32 representation of the string
     */
    function stringToBytes32(
        string memory _string
    ) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(_string);

        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(_string, 32))
        }
    }
}
