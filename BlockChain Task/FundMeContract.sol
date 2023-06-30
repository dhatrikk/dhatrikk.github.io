// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

error NotOwner();

contract FundMe {
    mapping(address => uint256) public addressToAmountFunded; // provide amount paid by particualar address
    mapping(address => bool) unique;
    address[] public funders; // array of addresses of unique funders

    address public i_owner; 

    function transferOwnership(address newOwner) public {  // function for transfer of ownership
        i_owner = newOwner; // you will need to transfer the ownership as intially no one is owner
    }

    function fund() public payable {   // This function is used for funding
        require(msg.value >= 1, "You need to spend more ETH!");
        addressToAmountFunded[msg.sender] += msg.value;
        if (!unique[msg.sender]) {
            unique[msg.sender] = true;
            funders.push(msg.sender);
        }
    }

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }

    function withdraw() public onlyOwner {  // set the balance to zero
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
}
