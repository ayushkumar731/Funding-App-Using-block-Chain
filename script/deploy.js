const hre = require("hardhat");

async function main() {
  const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();

  await campaignFactory.deployed();

  console.log(
    `Deployed to ${campaignFactory.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
0x2beB3c82FbDceb210825b8F9dFBaA12fAeE46a01