//@ts-nocheck
import React, { useEffect, useState } from "react";
import instance from "../ethereum/factory.js";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function IndexCampaign({ campaigns }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={{
            pathname: '/campaigns/[address]',
            query: { address: address },
          }}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <a className="item">
            <Button
              content="Create Campaign"
              icon="add circle"
              floated="right"
              primary
            />
          </a>
        </Link>

        {renderCampaigns()}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const campaigns = await instance.methods.getDeployedCampaings().call();
  return {
    props: { campaigns }, // will be passed to the page component as props
  };
}
