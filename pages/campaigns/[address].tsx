import React from "react";
import instance from "../../ethereum/factory";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import web3 from "../../web3";
import { ContributeForm } from "../../components/molecules/ContributeForm";
import Link from "next/link";

export default function CampaignShow({ serializedDetails }) {
  const router = useRouter();
  const { address } = router.query;

  let items = [];
  if (serializedDetails) {
    let minimumContribution = serializedDetails[0];
    let balance = serializedDetails[1];
    let requestsCount = serializedDetails[2];
    let approversCount = serializedDetails[3];
    let manager = serializedDetails[4];
    items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum contribution (wei)",
        description:
          "You must contribute at least this wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to the campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend",
      },
    ];
  }

  return (
    <Layout>
      <h1>Campaign: {address}</h1>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
          <Link href={`/campaigns/${address}/requests`}>
            <a>
              <Button primary>View Requests</Button>
            </a>
          </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // will be passed to the page component as props
  };
}

export async function getStaticProps({ params }) {
  const campaign = Campaign(params.address);
  const details = await campaign.methods.getDetails().call();
  const serializedDetails = await JSON.parse(JSON.stringify(details));
  return {
    props: { serializedDetails }, // will be passed to the page component as props
  };
}
