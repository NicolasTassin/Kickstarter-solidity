import Web3 from "web3";
import { useEffect, useState } from "react";

const web3Init = () => {
  

  useEffect(async () => {

    if (window.ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts, "accounts");
      setAddress(accounts[0]);
      let web3 = await new Web3(ethereum);
      
      console.log(web3, "web3");
      return web3
    } else {
      console.log("install metamask");
    }
      
  }, []);
  return web3
  
};

export default web3Init;
