import React, { useState } from 'react';
import Web3 from 'web3';
import './index.css';
import {contractABI, contractAddress} from './Constants/constant';
import Menu from "./Menu";
const web3 = new Web3(Web3.givenProvider);
const contractaddress = contractAddress; // Replace with your contract's address

function Register() {
  const [producerAddress, setProducerAddress] = useState('');
  const [consumerAddress,setconsumerAddress] = useState('');
  const [userID, setUserID] = useState(0);

  const registerProducer = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);

      await contract.methods.registerProducer(producerAddress, userID).send({ from: accounts[0] });

      console.log('Producer registered successfully!');
    } catch (error) {
      console.error('Failed to register producer:', error);
    }
  };

  const registerConsumer = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);

      await contract.methods.registerConsumer(consumerAddress, userID).send({ from: accounts[0] });

      console.log('Producer registered successfully!');
    } catch (error) {
      console.error('Failed to register producer:', error);
    }
  };

  return (
    <>
    <Menu/>
    <div className='main_div'>
    <div className='center_div'>
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
        placeholder="User ID"
        value={userID}
        onChange={(e) => setUserID(parseInt(e.target.value))}
      />
      <br/>
      <button onClick={registerProducer}>Prosumer</button>
    </div>

    <div className='center_div'>
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
        placeholder="User ID"
        value={userID}
        onChange={(e) => setUserID(parseInt(e.target.value))}
      />
      <br/>
      <button onClick={registerConsumer}>Consumer</button>
    </div>
    </div>
    </>
  );
}

export default Register;

