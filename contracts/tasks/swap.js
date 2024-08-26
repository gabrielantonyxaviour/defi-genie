const { networks } = require("../networks");
const coreAbi = require("../build/artifacts/contracts/DefiGenie.sol/DefiGenie.json");
task("swap", "Swaps tokens").setAction(async (taskArgs) => {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const core = new ethers.Contract(
    "0xE2B097997c7c7591F517E41723A9C6AffFaae59A",
    coreAbi.abi,
    signer
  );
  const response = await core.swapWETHForDAI("10000", {});
  const receipt = await response.wait();
  console.log(receipt);
});
