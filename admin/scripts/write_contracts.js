const fs = require('fs')
const erc20Tokens = require('./token_list').erc20Tokens;
const contract = fs.readFileSync('./contracts/ERC20.sol', 'utf-8')

erc20Tokens.forEach((token) => {
    const symbol = token[0];
    const contractName = token[1];
    const tokenName = token[2];

    let tokenContract = contract
    tokenContract = tokenContract.replace('TemplateToken', `${contractName}`)
    tokenContract = tokenContract.replace('Template Token', `${tokenName}`)
    tokenContract = tokenContract.replace('TMP', `${symbol}`)
    
    fs.writeFileSync(`./contracts/${contractName}.sol`, tokenContract)
    console.log(`Wrote ${symbol} contract`)
});


