# Ethereum Account Recovery Demo

## Setup
Follow the instructions in [SETUP.md](SETUP.md) to setup your environment.

## Run the Demo

### Accounts
You will receive details for 3 accounts:
* Compromised account: this is the account who's assets you will recover.
* Sponsor account: this is the account that will pay for the transaction to recover the assets.
* Receiver account: this is the account that will receive the recovered assets.

### Config
Update `.env` with the private keys for the compromised and sponsor accounts, and the address for the receiver account.

The `FLASHBOTS_RELAY_SIGNING_KEY` can be any valid private key. Feel free to use `0x3f2de51637b9d3944c25acc63251c4bf7cf651c46a2d7da622e2d677d9917972`, or a key of your choice.

Use the `ETHEREUM_RPC_URL` provided with the account details, or use your own for Goerli testnet.

### Analyze Situation
1. Bring up the compromised account in etherscan.io `https://goerli.etherscan.io/address/[address]`.
2. Review the list of tokens the account has in the drop down.
3. Click into each, and get the contract address for each token.
4. Compare the contract addresses to the list of valid tokens.

### Recover Assets
5. Update `src/index.ts` with the list of valid token addresses to transfer on line 69.
6. Update the `PRIORITY_GAS_PRICE` in `src/index.ts` to a higher values (e.g. 25)
7. Run `npm run start` to transfer the assets.

This last step may take a few minutes since there are only a handful of validators on Goerli that support flashbots.

When the script completes, you should see a message like `Congrats, included in 7545337` or `Nonce too high, bailing`, and the transactions should appear on etherscan under the compromised account's page. Take a look at each of the accounts and make sure all assets were transferred correctly.
