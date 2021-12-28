// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Crowdsale.sol";

/**
 * @title TimedCrowdsale
 * @dev Crowdsale accepting contributions only within a time frame.
 */
abstract contract TimedCrowdsale is Crowdsale {
    using SafeMath for uint256;

    uint256 private _openingTime;
    uint256 private _closingTime;

    /**
     * Event for crowdsale extending
     * @param newClosingTime new closing time
     * @param prevClosingTime old closing time
     */
    event TimedCrowdsaleExtended(uint256 prevClosingTime, uint256 newClosingTime);

    /**
     * @dev Reverts if not in crowdsale time range.
     */
    modifier onlyWhileOpen {
        require(isOpen(), "Crowdsale: not open");
        _;
    }

    /**
     * @dev Constructor, takes crowdsale opening and closing times.
     * @param __openingTime Crowdsale opening time
     * @param __closingTime Crowdsale closing time
     */
    constructor (uint256 __openingTime, uint256 __closingTime) {
        // solhint-disable-next-line not-rely-on-time, reason-string
        require(__openingTime >= block.timestamp, "Crowdsale: opening before current");
        // solhint-disable-next-line reason-string
        require(__closingTime > __openingTime, "Crowdsale: opening not before closing");

        _openingTime = __openingTime;
        _closingTime = __closingTime;
    }

    /**
     * @return the crowdsale opening time.
     */
    function openingTime() public view returns (uint256) {
        return _openingTime;
    }

    /**
     * @return the crowdsale closing time.
     */
    function closingTime() public view returns (uint256) {
        return _closingTime;
    }

    /**
     * @return true if the crowdsale is open, false otherwise.
     */
    function isOpen() public view returns (bool) {
        // solhint-disable-next-line not-rely-on-time
        return block.timestamp >= _openingTime && block.timestamp <= _closingTime;
    }

    /**
     * @dev Checks whether the period in which the crowdsale is open has already elapsed.
     * @return Whether crowdsale period has elapsed
     */
    function hasClosed() public view returns (bool) {
        // solhint-disable-next-line not-rely-on-time
        return block.timestamp > _closingTime;
    }

    /**
     * @dev Extend parent behavior requiring to be within contributing period.
     * @param beneficiary Token purchaser
     * @param weiAmount Amount of wei contributed
     */
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal virtual override onlyWhileOpen view {
        super._preValidatePurchase(beneficiary, weiAmount);
    }

    function sendLeftoversToPool() public {
        // solhint-disable-next-line reason-string
        require(hasClosed(), "Crowdsale: Can't send before sale end");
        super._sendLeftoversToPool();
    }
}
