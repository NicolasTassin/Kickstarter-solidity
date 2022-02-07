import React, {useEffect, useState} from 'react';
import factory from '../ethereum/factory';


const NewCampaign = () => {
    const[campaigns, setCampaigns] = useState([]);
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [recipient, setRecipient] = useState('');
    

    useEffect(() => {
        const campaigns = factory.methods.getDeployedCampaigns().call();
        setCampaigns(campaigns);
    }, [])
    return <h1>{campaigns}</h1>;
}


export default NewCampaign;