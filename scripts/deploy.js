const hre = require("hardhat");

async function getBalances(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses){
  let counter = 0;
  for(const address of addresses){
    console.log(`Address ${counter} balance:`,await getBalances(address));
    counter++;
  }
}

async function consoleMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;

    console.log(`At timestamp ${timestamp}, name ${name}, address ${from}, message ${message}`);
  }
}

async function main() {
  const [owner,from1,from2,from3] = await hre.ethers.getSigners();
  const Energy = await hre.ethers.getContractFactory("Energy");
  const contract = await Energy.deploy();

  await contract.deployed();

  console.log("Address of contract:",contract.address);

  const addresses = [owner.address,from1.address,from2.address,from3.address];
  console.log("Before buying cha");
  await consoleBalances(addresses);

  const amount = {value: hre.ethers.utils.parseEther("1")};
  await contract.connect(from1).buyCha("from1","very nice cha",amount);
  await contract.connect(from2).buyCha("from2","very nice course",amount);
  await contract.
    connect(from3).buyCha("from3","very nice information",amount);

  console.log("After buying cha");
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
