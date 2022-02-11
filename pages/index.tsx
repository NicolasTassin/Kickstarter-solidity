//@ts-nocheck
import React, { useEffect, useState } from "react";
import instance from "../ethereum/factory.js";

export default function IndexCampaign({ campaigns }) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");

  return (
    <>
      <div>{campaigns}</div>
    </>
  );
}

export async function getStaticProps() {
  const campaigns = await instance.methods.getDeployedCampaings().call();
  return {
    props: { campaigns }, // will be passed to the page component as props
  };
}
