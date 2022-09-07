const { ethers } = require('hardhat');

const fs = require('fs');
const crypto = require('crypto');

const erc20Tokens = require('./token_list').erc20Tokens;
const erc20Contracts = require('./contract_list').erc20Contracts;

function generateAccounts() {
    const compromisedWallet = new ethers.Wallet("0x" + crypto.randomBytes(32).toString('hex'));
    console.log("Compromised Account:");
    console.log("  Address:     " + compromisedWallet.address);
    console.log("  Private Key:", compromisedWallet.privateKey);

    const sponsorWallet = new ethers.Wallet("0x" + crypto.randomBytes(32).toString('hex'));
    console.log("Sponsor Account:");
    console.log("  Address:     " + sponsorWallet.address);
    console.log("  Private Key:", sponsorWallet.privateKey);

    const receiverWallet = new ethers.Wallet("0x" + crypto.randomBytes(32).toString('hex'));
    console.log("Receiver Account:");
    console.log("  Address:     " + receiverWallet.address);
    console.log("  Private Key:", receiverWallet.privateKey);

    return { compromisedWallet, sponsorWallet, receiverWallet };
}

async function main() {

    const [owner] = await ethers.getSigners();
 
    // create a new set of accounts
    let { compromisedWallet, sponsorWallet, receiverWallet } = generateAccounts();

    for (let i = 0; i < erc20Tokens.length; i++) {
        const symbol = erc20Tokens[i][0]
        const contractName = erc20Tokens[i][1]
        const tokenAddress = erc20Contracts[symbol];
        
        console.log(`${contractName} (${symbol}) => ${tokenAddress}`);

        let contractInfo = JSON.parse(fs.readFileSync(`./artifacts/contracts/${contractName}.sol/${contractName}.json`, 'utf8'));
        let abi = contractInfo.abi;

        const contract = new ethers.Contract(tokenAddress, abi, owner)

        const transferAmount = ethers.utils.parseUnits("1000.0")
        console.log(`Sending ${ethers.utils.formatUnits(transferAmount)} to ${compromisedWallet.address}`);

        let tx = await contract.transfer(compromisedWallet.address, transferAmount);
        console.log(`TX: ${tx.hash}`)
        await tx.wait();

        // TODO: test sending tokens and eth back

        if (i >= 2) {
            break
        }
    }

    // tx = {
    //     to: compromisedWallet.address,
    //     value: ethers.utils.parseEther("0.0001")
    // }

    // await owner.sendTransaction(tx)
    //     .then((txObj) => {
    //         console.log('send eth to compromised wallet tx:', txObj.hash)
    //     })

    tx = {
        to: sponsorWallet.address,
        value: ethers.utils.parseEther("0.1")
    }

    await owner.sendTransaction(tx)
        .then((txObj) => {
            console.log('send eth to sponsor tx:', txObj.hash)
        })
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
