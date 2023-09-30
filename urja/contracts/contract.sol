// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.20;

contract TransferEther {

    function transferEther(address payable recipient, uint256 amount) public payable{
    require(amount <= address(this).balance, "Insufficient balance");

    // Method 1: Using the transfer function
    recipient.transfer(amount);

    // Method 2: Using the send function
    bool success = recipient.send(amount);
    require(success, "Transfer failed");

    // Method 3: Using the call function
    (bool callSuccess, ) = recipient.call{value: amount}("");
    require(callSuccess, "Transfer failed");
}

}