const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const mnemonicPhrase = 'snake fuel month come census tube catch rigid end dial grab flock'

const provider = new HDWalletProvider({
    mnemonic: mnemonicPhrase,
    providerOrUrl: 'https://rinkeby.infura.io/v3/a1c48696c83f469c838298470030eed1'
})


const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[1]);
 
  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data:compiledFactory.evm.bytecode.object})
    .send({ gas: '1000000', from: accounts[1] });
 
  console.log( JSON.stringify(compiledFactory.abi), "interface")
  console.log('Contract deployed to', result.options.address); //VERY IMPORTANT !
  provider.engine.stop();
}
deploy()