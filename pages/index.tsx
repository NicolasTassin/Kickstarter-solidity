//@ts-nocheck
import React, { useEffect, useState } from "react";
import instance from "../ethereum/factory.js";
import { StyledButton } from "./index.styles.ts";
import { Card } from "semantic-ui-react";
export default function IndexCampaign({ campaigns }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: "view Campaign",
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <>
     
      <div>
      <link
    async
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
  />
  
        {renderCampaigns()}
        </div>
    </>
  );
}

export async function getStaticProps() {
  const campaigns = await instance.methods.getDeployedCampaings().call();
  return {
    props: { campaigns }, // will be passed to the page component as props
  };
}
