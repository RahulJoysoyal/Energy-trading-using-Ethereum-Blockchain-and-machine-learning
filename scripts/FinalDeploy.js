const hre = require("hardhat");

async function main() {
    const Energy = await hre.ethers.getContractFactory("Energy");
    const contract = await Energy.deploy(1);
    await contract.deployed();
  
    await contract.deployed();
    console.log("Address of contract:",contract.address);
}
main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });

