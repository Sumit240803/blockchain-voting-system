const hre = require("hardhat");
async function main() {
    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    const[deployer] = await hre.ethers.getSigners();
    await voting.connect(deployer).addCandidate("Alice");
await voting.connect(deployer).addCandidate("Bob");
    await voting.waitForDeployment();
    console.log("Admin" ,await voting.admin());

    console.log("Voting contract deployed at:", await voting.getAddress());
    console.log("Candidates" , await voting.getCandidates());
}

main().catch((err)=>{
    console.log(err);
    process.exitCode = 1;
})