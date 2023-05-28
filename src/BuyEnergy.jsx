import React, { useState } from 'react';
import Web3 from 'web3';
import './index.css';
import {contractABI, contractAddress} from './Constants/constant';
import Menu from "./Menu";
const web3 = new Web3(Web3.givenProvider);
const contractaddress = contractAddress; // Replace with your contract's address

function BuyEnergy() {
  const [producerAddress, setProducerAddress] = useState(null);
  const [buyDay,setBuyDay] = useState(null);
  const [bidPrice, setBidPrice] = useState(0);
  const [bidEnergy, setBidEnergy] = useState(0);

  const registerProducer = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);

      await contract.methods.buy_energy (producerAddress, buyDay, bidPrice, bidEnergy).send({ from: accounts[0] });

      console.log('Energy Bid successfully!');
    } catch (error) {
      console.error('Failed to Bid Energy:', error);
    }
  };

//   const registerConsumer = async () => {
//     try {
//       const accounts = await web3.eth.requestAccounts();
//       const contract = new web3.eth.Contract(contractABI, contractaddress);

//       await contract.methods.registerConsumer(consumerAddress, consumerID).send({ from: accounts[0] });

//       console.log('Producer registered successfully!');
//     } catch (error) {
//       console.error('Failed to register producer:', error);
//     }
//   };

  return (
    <>
    <Menu/>
    <div className='main_div'>
    <div className='center_div'>
      <h1>Enter Producer Address</h1>
      <input
        type="text"
        placeholder="Producer Address"
        value={producerAddress}
        onChange={(e) => setProducerAddress(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Buying Day"
        value={buyDay}
        onChange={(e) => setBuyDay(parseInt(e.target.value))}
      />
      <br/>
      <input
        type="number"
        placeholder="Bid Price"
        value={bidPrice}
        onChange={(e) => setBidPrice(parseInt(e.target.value))}
      />
      <br/>
      <input
        type="number"
        placeholder="Amount of Energy"
        value={bidEnergy}
        onChange={(e) => setBidEnergy(parseInt(e.target.value))}
      />
      <br/>
      <button onClick={registerProducer}>Prosumer</button>
    </div>
    </div>
    </>
  );
}

export default BuyEnergy;

