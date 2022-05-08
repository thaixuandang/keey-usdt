require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const { alchemyApiKey, mnemonic } = require('./secrets.json');

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: [
        '2e857ce40aa4b25bb9bc1f765694ec94779214d7fe65799aab2d4938fe113d45',
        'e3d53cee3c7e676f64a9937d089c8ab99f357da10cda90cb385c01238692cfdf',
      ],
    },
  },
};
