// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundTransfer {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function transferFunds(address payable _to, uint256 _amount) external onlyOwner {
        require(_to != address(0), "Invalid recipient address");
        require(_amount > 0, "Amount must be greater than zero");
        require(address(this).balance >= _amount, "Insufficient balance in the contract");

        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Transfer failed");

        emit FundsTransferred(msg.sender, _to, _amount);
    }

    receive() external payable {}

    event FundsTransferred(address indexed from, address indexed to, uint256 amount);
}
