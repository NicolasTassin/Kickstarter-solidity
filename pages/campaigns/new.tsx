import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Input, Button, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../web3";
import { useRouter } from 'next/router'
import Link from "next/link";



const CampaignNew = () => {
  const [contribution, setContribution] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(contribution)
        .send({ from: accounts[0], gas: "1000000" });
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };


  return (
    <Layout>
      

      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Minimum contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            onChange={(e) => setContribution(e.target.value)}
          />
        </Form.Field>
        <Button loading={loading} primary>Create!</Button>
      </Form>
      <h1>{contribution}</h1>
      {error && (
        <Message negative>
          <Message.Header>Oops!</Message.Header>
          <p>{error}</p>
        </Message>
      )}
    </Layout>
  );
};

export default CampaignNew;
