/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle');
require('dotenv').config({ path: './.env.local'});

task("accounts", "Print the list of accounts", async( taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const address = await account.getAddress();
    const  balance = await account.getBalance();
    console.log(`${address}: ${hre.ethers.utils.formatEther(balance)}`)
  }
})

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "polygon",
  networks: {
    hardhat: {
    },
    polygon: {
      url: process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY]
    }
  },
};
