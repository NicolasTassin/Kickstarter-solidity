//@ts-nocheck
import React, { useEffect, useState } from "react";
import CampaignFactory from "../ethereum/build/CampaignFactory.json";

let Web3 = require("web3");

export default function NewCampaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");

  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);

  // useEffect(async () => {

  //       if(window.ethereum){
  //           const accounts = await ethereum.request({ method: "eth_requestAccounts" })
  //           console.log(accounts, "accounts")
  //           setAddress(accounts[0]);
  //           let w3 = await new Web3(ethereum);
  //           console.log(w3, "w3")
  //           setWeb3(w3);
  //           let factory = await new w3.eth.Contract(abi, contractAddress);
  //           console.log(factory, "factory")
  //           setContract(c);

  //           const campaigns = await factory.methods.getDeployedCampaigns().call();
  //           setCampaigns(campaigns);

  //       }else{
  //           console.log('install metamask')
  //       }

  // }, [web3, contract, address]);

  const handleClick = async (e) => {
    if (window.ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts, "accounts");
      setAddress(accounts[0]);
      let w3 = await new Web3(ethereum);
      setWeb3(w3);
      console.log(web3, "web3");
    } else {
      console.log("install metamask");
    }
  };
  const handleFetch = async (e) => {
    let contractAddress = "0xcdc5fd8399Cf69B5E48bEe15299760EF5dca3451";
    console.log(web3, "web3");
    let factory = await new web3.eth.Contract(
      CampaignFactory.abi,
      contractAddress
    );
    console.log(factory, "factory");
    setContract(factory);

    const campaigns = await contract.methods.getDeployedCampaings().call();
    setCampaigns(campaigns);
    console.log(campaigns, "campaigns");
  };
  return (
    <>
      <button value="1hello" onClick={handleClick}>
        Connect to metamask
      </button>
      <button value="1hello" onClick={handleFetch}>
        Fetch Contract
      </button>
    </>
  );
}
