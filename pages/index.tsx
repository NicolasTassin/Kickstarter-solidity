//@ts-nocheck
import React, { useEffect, useState } from "react";
import instance from "../ethereum/factory.js";

export default function IndexCampaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(async () => {
    const campaigns = await instance.methods.getDeployedCampaings().call();
    setCampaigns(campaigns);
  }, []);

  
  return (
    <>
      <div>{campaigns}</div>
    </>
  );
}
