import React, { useState } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import Connected from './Components/Connected';
import Login from './Components/Login';
import { ethers } from 'ethers';
import Menu from './Menu';
import { Link } from 'react-router-dom';

function Home() {
    const [account,setAccount] = useState('');
    const [isConnect,setIsConnected] = useState(false);
    const [provider,setProvider] = useState('');

    async function connectToMetamask() {
        if (window.ethereum) {
          try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            console.log("Metamask Connected : " + address);
            setIsConnected(true);
            //canVote();
          } catch (err) {
            console.error(err);
          }
        } else {
          console.error("Metamask is not detected in the browser")
        }
      }

    return (
        <>
        <div>
            {isConnect?(<Connected account={account}/>):(<Login connectWallet={connectToMetamask}/>)}
        </div>
        </>
    );
}

export default Home;