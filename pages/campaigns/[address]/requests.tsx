import React from "react";
import Layout from "../../../components/Layout";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Campain from "../../../ethereum/campaign";

const RequestIndex = async () => {
  const router = useRouter();
  const { address } = router.query;

  const campaign=Campain(address);
  const requestCount = await campaign.method.getRequestsCount().call();
  return (
    <Layout>
      <div>RequestIndex</div>
      <Link href={`/campaigns/${address}/newRequest`}>
        <a className="item">
          <Button primary >New</Button>
        </a>
      </Link>
    </Layout>
  );
};

export default RequestIndex;
