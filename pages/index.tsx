//@ts-nocheck
import React, { useEffect, useState } from "react";
import instance from "../ethereum/factory.js";

export default function NewCampaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");

  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(async () => {

    const campaigns = await instance.methods.getDeployedCampaings().call();
    setCampaigns(campaigns);
    console.log(campaigns, "campaigns");

  }, []);

  
  return (
    <>
      <div>{campaigns}</div>
    </>
  );
}
