// SPDX-License-Identifier: Unlicensed

pragma solidity >0.7.0 <=0.9.0;

contract CampaignFactory {
    address[] public deployedCampaign;
    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imageURI,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle,
        uint campaignRequiredAmount,
        string memory imageURI,
        string memory description,
        string memory campaignCategory
    ) public {
        Campaign newCampaign = new Campaign(
            campaignTitle,
            campaignRequiredAmount,
            imageURI,
            description,
            campaignCategory,
            msg.sender
        );
        deployedCampaign.push(address(newCampaign));

        emit campaignCreated(
            campaignTitle,
            campaignRequiredAmount,
            msg.sender,
            address(newCampaign),
            imageURI,
            block.timestamp,
            campaignCategory
        );
    }
}

contract Campaign {
    event donated(
        address indexed donar,
        uint indexed amount,
        uint indexed timeStamp
    );
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    string public category;
    address payable public owner;
    uint public receivedAmount;

    constructor(
        string memory campaignTitle,
        uint campaignRequiredAmount,
        string memory imageURI,
        string memory description,
        string memory campaignCategory,
        address campaignOwnerAddress
    ) {
        title = campaignTitle;
        requiredAmount = campaignRequiredAmount;
        image = imageURI;
        story = description;
        category = campaignCategory;
        owner = payable(campaignOwnerAddress);
    }

    function donate() public payable {
        // require(owner != msg.sender, "You can't donate for own capaign");
        require(requiredAmount > receivedAmount, "Required Amount Fullfilled");

        owner.transfer(msg.value);
        receivedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }
}
