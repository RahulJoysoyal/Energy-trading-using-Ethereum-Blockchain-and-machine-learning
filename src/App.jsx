import React from 'react';
import { Routes,Route,Navigate } from 'react-router-dom';
import About from './About';
import Register from './Register';
import Home from './Home';
import Menu from './Menu';
import Trade from './TradeEnergy';
import Search from './Search';
//import Error from './Error';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import {ethers} from 'ethers'; 
import {contractAbi, contractAddress} from './Constants/constant';
import Login from './Components/Login';
import { useState, useEffect } from 'react';
import Connected from './Components/Connected';
import OfferEnergy from './OfferEnergy';
import BuyEnergy from "./BuyEnergy"

function App() {
  const [provider,setProvider] = useState('');
  const [account,setAccount] = useState('');
  const [isConnect,setIsConnected] = useState(false);

  useEffect( () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
  })

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      //canVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

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
    <Routes>
    <Route path='/' Component={Home} exact/>
      <Route path='/register' Component={Register} exact/>
      <Route path='/about' Component={About} exact/>
      <Route path='/trade' Component={Trade} exact/>
      <Route path='/search' Component={Search} exact/>
      <Route path="/offer" Component={OfferEnergy}/>
      <Route path="/buy" Component={BuyEnergy}/>
      {/*<Route Component={Error}/>*/}
      <Route path="*" element={<Navigate to ="/" />}/>
    </Routes>
    </>
  );
}


export default App;