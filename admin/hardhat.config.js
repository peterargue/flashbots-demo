require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  solidity: {
    compilers: [
      {
        version: "0.4.18",
      },
      {
        version: "0.8.9",
        settings: {},
      },
    ],
    overrides: {
      "contracts/WETH9.sol": {
        version: "0.4.18",
        settings: {}
      }
    }
  },
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://goerli.infura.io/v3/[infura-project-id]",
      accounts: ["account-private-key"]
    }
  },
};
