// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const AIOriginCertificate = await ethers.getContractFactory("AIOriginCertificate");
  const contract = await AIOriginCertificate.deploy();

  // For newer ethers versions, use waitForDeployment() instead of deployed()
  await contract.waitForDeployment();
  
  const contractAddress = await contract.getAddress();
  console.log("AIOriginCertificate deployed to:", contractAddress);
  
  return contractAddress;
}

main()
  .then((contractAddress) => {
    console.log("Deployment successful!");
    console.log("Update your .env file with:");
    console.log(`CONTRACT_ADDRESS=${contractAddress}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
