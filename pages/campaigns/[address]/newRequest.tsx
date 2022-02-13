import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../web3";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../../components/Layout";

const NewRequest = () => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { address } = router.query;

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts, "------------------accounts");
      const campaign = Campaign(address);
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
        router.push(`/campaigns/${address}/requests`);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
      <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={(event) => onSubmit(event)}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </Form.Field>
        <Button lodading={loading} primary>
          Create!
        </Button>
        {error && (
          <Message negative>
            <Message.Header>Oops!</Message.Header>
            <p>{error}</p>
          </Message>
        )}
      </Form>
    </Layout>
  );
};

export default NewRequest;
