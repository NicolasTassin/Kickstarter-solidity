import web3 from "../web3";
import CampaignFactory from './build/CampaignFactory.json';



const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.abi),
    '0xbEce3a9217842Da536294340b173d5C85b47DEeA'
);

export default instance