const { expect } = require("chai");
const { ethers } = require("hardhat");

// function buy(token, from, amount) {
//   token.connect(from).buy(amount);
// }

describe("USDT KEEY", function () {
  it("Should show supply and balance", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();


    const usdtFactory = await hre.ethers.getContractFactory("USDT");
    const usdt = await usdtFactory.connect(addr2).deploy(100000000);

    await usdt.deployed();

    console.log("USDT deployed to:", usdt.address);

    const keeyFactory = await hre.ethers.getContractFactory("KEEY");
    const keey = await keeyFactory.deploy(2500, 10000, usdt.address);

    await keey.deployed();

    console.log("KEEY deployed to:", keey.address);

    
    
    console.log("Total KEEY supply:", await keey.keeysAvailable());
    console.log("My USDT Balance:", await usdt.getBalance());
    console.log("My keey Balance:", await keey.getBalance());

    const a = (await usdt.connect(addr2).approve(keey.address, 123 * 10000));
    console.log(Boolean(a));
    await keey.connect(addr2).buy(123);
    console.log("My USDT Balance:", await usdt.getBalance());
    console.log("My keey Balance:", await keey.getBalance());

    // const Greeter = await ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, world!");
    // await greeter.deployed();

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
