const { networks } = require("../networks");
const coreAbi = require("../build/artifacts/contracts/DefiGenie.sol/DefiGenie.json");
task("swap", "Swaps tokens").setAction(async (taskArgs) => {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const core = new ethers.Contract(
    "0xa41F11778F494BF3bE82955eB74B922664400213",
    coreAbi.abi,
    signer
  );
  const response = await core.swap(
    "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    "0x0000000000000000000000000000000000000000",
    "1000000000000000"
  );
  const receipt = await response.wait();
  console.log(receipt);
});
