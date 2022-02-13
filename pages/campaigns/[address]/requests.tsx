import React from "react";
import Layout from "../../../components/Layout";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

const RequestIndex = () => {
  const router = useRouter();
  const { address } = router.query;
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
