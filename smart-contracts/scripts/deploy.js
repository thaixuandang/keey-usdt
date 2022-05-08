// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [myAccount, keeySupply] = await ethers.getSigners();

  console.log('My account:', myAccount)
  console.log('KEEY supply:', keeySupply)

  const usdtFactory = await hre.ethers.getContractFactory("USDT");
  const usdt = await usdtFactory.connect(myAccount).deploy(10 ** 10);

  await usdt.deployed();

  console.log("USDT deployed to:", usdt.address);

  const keeyFactory = await hre.ethers.getContractFactory("KEEY");
  const keey = await keeyFactory.connect(keeySupply).deploy(2500, 10000, usdt.address);

  await keey.deployed();

  console.log("KEEY deployed to:", keey.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
