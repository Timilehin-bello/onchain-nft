// scripts/deploy.js

import { ethers } from "hardhat";
const main = async () => {
  // Get 'OnChainNFT' contract
  const nftContractFactory = await ethers.getContractFactory("OnChainNFT");

  // Deploy contract
  const nftContract = await nftContractFactory.deploy();

  console.log("✅ Contract deployed to:", nftContract.target);

  // SVG image that you want to mint
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">
  <style>.base { fill: white; font-family: serif; font-size: 14px; }</style>
  <rect width="100%" height="100%" fill="purple" />
  <text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">Oluwatimilehin bello</text>
  <text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">Web3bridge Onchain NFT</text>
</svg>`;

  // Call the mint function from our contract
  const txn = await nftContract.mint("Oluwatimilehin Bello", "We3bridge", svg);
  const txnReceipt = await txn.wait();

  // Get the token id of the minted NFT (using our event)
  //   const event = txnReceipt.events?.find((event) => event.event === "Minted");
  //   const tokenId = event?.args["tokenId"];

  console.log(
    "🎨 Your minted NFT:",
    `https://testnets.opensea.io/assets/sepolia/${nftContract.target}`
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
