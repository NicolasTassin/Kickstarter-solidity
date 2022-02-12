// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public{
        address newCampaign = address(new Campaign(minimum, msg.sender));//Bug if no address() : "Type contract Campaign is not implicitly convertible to expected type address "
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaings() public view returns (address[] memory ) {
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    uint numRequests;
    mapping(uint => Request) public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    constructor (uint minimum, address creator){
        manager = creator;
        minimumContribution = minimum;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getDetails() public view returns (string memory, uint, address, uint, address){
        return (requests[numRequests].description, requests[numRequests].value, requests[numRequests].recipient, requests[numRequests].approvalCount, manager);
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    

    function createRequest (string memory description, uint value,
            address recipient) public{
                Request storage request = requests[numRequests++];

                request.description = description;
                request.value = value;
                request.recipient = payable(recipient); //Bug if no payable : "Type address is not implicitly convertible to expected type address payable"
                request.complete = false;
                request.approvalCount = 0;
            
        }
    function approveRequest(uint256 index) public {
        Request storage request = requests[index];//local variable to avoid repetition

        require(approvers[msg.sender]); //Check if user already donate
        require(!request.approvals[msg.sender]); // Check if user DIDN'T approve yet

        request.approvals[msg.sender] = true; //Add user to approvals mapping
        request.approvalCount++; // adding "YES" vote.
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];//local variable to avoid repetition

        require(!request.complete);
        require(request.approvalCount > (approversCount /2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}