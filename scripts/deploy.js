// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Contract = await ethers.getContractFactory("AIOriginCertificate");
  const contract = await Contract.deploy();
  
  // Wait for deployment to complete
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  
  console.log("AIOriginCertificate deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
