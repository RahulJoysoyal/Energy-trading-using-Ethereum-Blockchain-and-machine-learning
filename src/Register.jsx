import React, { useState } from 'react';
import Web3 from 'web3';
import './index.css';
import {contractABI, contractAddress} from './Constants/constant';
import Menu from "./Menu";
import { Link } from 'react-router-dom';
const web3 = new Web3(Web3.givenProvider);
const contractaddress = contractAddress; // Replace with your contract's address

function Register() {
  const [producerAddress, setProducerAddress] = useState(null);
  const [consumerAddress,setconsumerAddress] = useState(null);
  const [producerID, setProducerID] = useState(null);
  const [consumerID, setConsumerID] = useState(null);
  const [prodEnergyBal, setProdEnergyBal] = useState(null);
  const [conEnergyBal, setConEnergyBal] = useState(null);


  const registerProducer = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);

      await contract.methods.registerProducer(producerAddress, producerID, prodEnergyBal).send({ from: accounts[0] });

      console.log('Producer registered successfully!');
    } catch (error) {
      console.error('Failed to register producer:', error);
    }
  };

  const registerConsumer = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);

      await contract.methods.registerConsumer(consumerAddress, consumerID, conEnergyBal).send({ from: accounts[0] });

      console.log('Consumer registered successfully!');
    } catch (error) {
      console.error('Failed to register consumer:', error);
    }
  };

  return (
    <>
    <Menu/>
    <div className='main_div'>
    <div className='center_div'>
    <div>
      <h1>Register as</h1>
      <input
        type="text"
        placeholder="Producer Address"
        value={producerAddress}
        onChange={(e) => setProducerAddress(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Producer ID"
        value={producerID}
        onChange={(e) => setProducerID(parseInt(e.target.value))}
      />
      <br/>
      <input
        type="number"
        placeholder="Energy Balance"
        value={conEnergyBal}
        onChange={(e) => setProdEnergyBal(parseInt(e.target.value))}
      />
      <br/>
      <button onClick={registerProducer}>Prosumer</button>
      </div>
    </div>


    <div className='center_div'>
    <div>
      <h1>Register as</h1>
      <input
        type="text"
        placeholder="Consumer Address"
        value={consumerAddress}
        onChange={(e) => setconsumerAddress(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Consumer ID"
        value={consumerID}
        onChange={(e) => setConsumerID(parseInt(e.target.value))}
      />
      <br/>
      <input
        type="number"
        placeholder="Energy Balance"
        value={conEnergyBal}
        onChange={(e) => setConEnergyBal(parseInt(e.target.value))}
      />
      <br/>
      <button onClick={registerConsumer}>Consumer</button>
      </div>
      <div className='connected-container4'>
      <Link  to="/trade"><button className='login-button'>Buy or Sell Now</button></Link>
      </div>
      </div>
    </div>
    </>
  );
}

export default Register;

