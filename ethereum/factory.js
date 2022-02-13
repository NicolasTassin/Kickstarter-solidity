import web3 from "../web3";
import CampaignFactory from "./build/CampaignFactory.json";


let contractAddress = "0x04249B512936f6876A677A3162E3e3C6eA034581";
let instance = new web3.eth.Contract(CampaignFactory.abi, contractAddress);


export default instance;
