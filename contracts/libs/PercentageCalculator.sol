// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title PercentageCalculator Library
 * @dev Library for calculating percentage values
 */
library PercentageCalculator {
    uint256 private constant DECIMALS = 10 ** 18;

    /**
     * @dev Calculate the percentage of an amount
     * @param amount The base amount
     * @param percentage The percentage value (0 to 100)
     * @return The calculated percentage of the amount
     */
    function calculatePercentage(
        uint256 amount,
        uint256 percentage
    ) internal pure returns (uint256) {
        require(
            percentage >= 0 && percentage <= 100,
            "Percentage must be between 0 and 100"
        );

        // Calculate the percentage value
        return (amount * percentage * DECIMALS) / (100 * DECIMALS);
    }
}
