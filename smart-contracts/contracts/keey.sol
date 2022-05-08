// contracts/keey.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KEEY is ERC20 {
    address private _supplyAddress;
    uint256 private _usdtPerKeey;
    ERC20 private _usdt;

    constructor(
        uint256 initialSupply,
        uint256 usdtPerKeey,
        address deployedUsdtAddress
    ) ERC20("KEEY", "KEEY") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
        _supplyAddress = msg.sender;
        _usdtPerKeey = usdtPerKeey;
        _usdt = ERC20(deployedUsdtAddress);
    }

    function decimals() public view virtual override returns (uint8) {
      return 9;
    }

    function buy(uint256 _amount) public returns (bool) {
        uint256 usdtAmount = _amount * _usdtPerKeey;
        _amount *= 10 ** decimals();
        usdtAmount *= 10 ** _usdt.decimals();
        require(
            _amount <= balanceOf(_supplyAddress),
            "The amount of KEEY available is not enough for sale"
        );
        require(
            usdtAmount <= _usdt.balanceOf(msg.sender),
            "Your USDT balance is not enough for payment"
        );
        _usdt.transferFrom(msg.sender, _supplyAddress, usdtAmount); // user must already allow at client
        _transfer(_supplyAddress, msg.sender, _amount);
        return true;
    }

    function keeysAvailable() public view returns (uint256) {
        return balanceOf(_supplyAddress);
    }

    function getBalance() view public returns (uint256) {
      return balanceOf(msg.sender);
    }
}
