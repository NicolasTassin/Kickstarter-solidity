import React from "react";
import instance from "../../ethereum/factory";
import Campaign from "../../ethereum/campaign";

import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function CampaignShow( {serializedDetails }) {
  console.log(serializedDetails, "serializedDetails in campaign show");
  const router = useRouter();
  const { address } = router.query;
  return (
    <Layout>
      <h1>Campaign: {address}</h1>
      {/* <h1>Details: {props}</h1> */}
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
  console.log(params, "params");
  const campaign = Campaign(params.address);
  const details = await campaign.methods.getDetails().call();
  const serializedDetails = await JSON.parse(JSON.stringify(details));
  console.log(serializedDetails, "serializedDetails");
  return {
    props: { serializedDetails }, // will be passed to the page component as props
  };
}
