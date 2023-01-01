// SPDX-License-Identifier: Unlicensed

pragma solidity >0.7.0 <=0.9.0;

contract CampaignFactory {
    address[] public deployedCampaign;
    event campaignCreated(
        string title,
        uint256 requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imageURI,
        uint256 indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle,
        uint256 campaignRequiredAmount,
        string memory imageURI,
        string memory storyURI,
        string memory campaignCategory
    ) public {
        Campaign newCampaign = new Campaign(
            campaignTitle,
            campaignRequiredAmount,
            imageURI,
            storyURI,
            campaignCategory
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
        uint256 indexed amount,
        uint256 indexed timeStamp
    );
    string public title;
    uint256 public requiredAmount;
    string public image;
    string public story;
    string public category;
    address payable public owner;
    uint256 public receivedAmount;

    constructor(
        string memory campaignTitle,
        uint256 campaignRequiredAmount,
        string memory imageURI,
        string memory storyURI,
        string memory campaignCategory
    ) {
        title = campaignTitle;
        requiredAmount = campaignRequiredAmount;
        image = imageURI;
        story = storyURI;
        category = campaignCategory;
        owner = payable(msg.sender);
    }

    function donate() public payable {
        require(owner != msg.sender, "You can't donate for own capaign");
        require(requiredAmount > receivedAmount, "Required Amount Fullfilled");

        owner.transfer(msg.value);
        receivedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }
}
