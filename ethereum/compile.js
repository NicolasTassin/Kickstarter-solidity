const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');


const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);// rm -rf build folder

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const campaignSource = fs.readFileSync(campaignPath, 'utf8');

fs.ensureDirSync(buildPath); // ensure build folder exists, if not create it

var input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol' : {
            content: campaignSource
        }
    },
    settings: {
        optimizer:
            {
                enabled: true
            },
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if(output.errors) {
    output.errors.forEach(err => {
        console.log(err.formattedMessage);
    });
} else {
    const contracts = output.contracts["Campaign.sol"];
    for (let contractName in contracts) {
        const contract = contracts[contractName];
        console.log(contract.abi)
        fs.writeFileSync(path.resolve(buildPath, `${contractName}.json`), JSON.stringify(contract, null, 2), 'utf8');
    }
    console.log('Compiled successfully');
}
