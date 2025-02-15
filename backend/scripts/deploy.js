const hre = require("hardhat");
async function main() {
    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    await voting.waitForDeployment();
    await voting.addCandidate("Alice");
    await voting.addCandidate("Bob");
    console.log("Voting contract deployed at:", await voting.getAddress());
}

main().catch((err)=>{
    console.log(err);
    process.exitCode = 1;
})