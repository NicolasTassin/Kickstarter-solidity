import Web3 from "web3";
import { useEffect, useState } from "react";


export const web3 = async () => { 
    
    const [web3, setWeb3] = useState(null);

    if (window.ethereum) {
        try {
         await window.ethereum.request({ method: 'eth_requestAccounts' });
         let web3 = await new Web3(window.ethereum);
         setWeb3(web3);
         return web3
        } catch (error) {
          if (error.code === 4001) {
            // User rejected request
          }
      
          setError(error);
        }
      }
    
    return web3


}


 

 
