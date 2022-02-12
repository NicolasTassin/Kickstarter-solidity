import web3 from "../web3";
import CampaignFactory from "./build/CampaignFactory.json";


let contractAddress = "0xf14cE0867De7a3EC522A1162e284073F893880ca";
let instance = new web3.eth.Contract(CampaignFactory.abi, contractAddress);


export default instance;
