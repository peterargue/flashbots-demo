# Setup Flashbots Demo

## Deploy token contracts
First, run the following command to generate solidity for the token contracts
```
npx hardhat run scripts/write_contracts.js
```

Next, deploy the contracts to Goerli testnet.
```
npx hardhat run --network goerli scripts/deploy.js
```

Finally, use the output from the previous command to update `scripts/contract_list.js`
```
module.exports.erc20Contracts = {
    "USDT": "0xb0c0f148fb8d943ea8e2c5bd87034dd5f39e16eb",
    ...
}
```

## Generate demo accounts
The following command will generate a single set of demo accounts and send tokens/eth to them.
```
npx hardhat run --network goerli scripts/setup_account.js
```