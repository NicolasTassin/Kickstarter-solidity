import web3 from "../web3";
import CampaignFactory from "./build/CampaignFactory.json";


let contractAddress = "0xcdc5fd8399Cf69B5E48bEe15299760EF5dca3451";
let instance = new web3.eth.Contract(CampaignFactory.abi, contractAddress);


export default instance;
