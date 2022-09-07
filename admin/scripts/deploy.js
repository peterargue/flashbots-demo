const hre = require("hardhat");
const erc20Tokens = require('./token_list').erc20Tokens;

async function main() {
  let expectedDuration = erc20Tokens.length * 15 / 60
  console.log(`Deploying ${erc20Tokens.length} tokens. This should take about ${expectedDuration} min.`);

  for (let i = 0; i < erc20Tokens.length; i++) {
    const symbol = erc20Tokens[i][0]
    const contractName = erc20Tokens[i][1]

    const Token = await hre.ethers.getContractFactory(contractName);
    const token = await Token.deploy();

    await token.deployed();

    // TODO: write out contract map to a file
    console.log(
      `Deployed ${symbol} to ${token.address}`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
