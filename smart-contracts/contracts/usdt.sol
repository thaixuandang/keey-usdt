// contracts/usdt.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract USDT is ERC20 {
    constructor(uint256 initialSupply) ERC20("Tether", "USDT") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function decimals() public view virtual override returns (uint8) {
      return 5;
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount * 10 ** decimals());
        return true;
    }

    function getBalance() view public returns (uint256) {
      return balanceOf(msg.sender);
    }
}
