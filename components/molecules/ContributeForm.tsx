import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../web3";
import { useRouter } from "next/router";

export const ContributeForm = (address) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(address.address, "------------------onSubmit");
        setError("")
        setLoading(true);
        const campaign = Campaign(address.address)
        try {
            const accounts = await web3.eth.getAccounts();
            console.log("------------------accounts");
            await campaign.methods.contribute().send({ 
                from: accounts[0], 
                value: web3.utils.toWei(value, 'ether')
            });
            router.replace(`/campaigns/${address.address}`);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
        
    }
return (
    <Form onSubmit={onSubmit}>
        <Form.Field  >
            <label>Amount to contribute</label>
            <Input 
            label="ether" 
            labelPosition="right" 
            value={value}
            onChange={event => setValue(event.target.value)}
            />
        </Form.Field>
        <Button loading={loading} primary >Contribute</Button>
        <h1>{value}</h1>
        {error && (
        <Message negative>
          <Message.Header>Oops!</Message.Header>
          <p>{error}</p>
        </Message>
      )}
    </Form>
)
}