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
  const [bidPrice, setBidPrice] = useState(null);
  const [bidEnergy, setBidEnergy] = useState(null);
  const [idx, setIdx] = useState(null)
  const [bid, setBid] = useState(null);


  const showBids= async ()=>{
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);
      setBid(await contract.methods.showBids(idx)).send({ from: accounts[0] });
  }catch(error){
    console.log("Can not load this bid")
  }
}

  const buyEnergy = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);
      await contract.methods.buy_energy(producerAddress, buyDay, bidPrice, bidEnergy).send({ from: accounts[0] });
      console.log('Energy Bid successfully!');
    } catch (error) {
      console.error('Failed to Bid Energy:', error);
    }
  };


  return (
    <>
    <Menu/>
    <div className='main_div'>
    <div className='center_div'>
    <h1>Enter the index number of the Bid</h1>
      <input
        type="number"
        placeholder="Bids Index"
        value={idx}
        onChange={(e) => setIdx(e.target.value)}
      />
      <button onClick={showBids}>Show the Bid</button>
      <br/>
      {!(bid!==null)?(
        <>
        <h1>Prosumer Address: {bid.producer}</h1>
        <h1>Bidding_Day: {bid.day}</h1>
        <h1>Price per Unit: {bid.maxprice}</h1>
        <h1>Offered Energy: {bid.maxenergy}</h1>
        </>
      ):null
      }
      <h1>Enter Bids info</h1>
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
      <button onClick={buyEnergy}>Buy Energy</button>
    </div>
    </div>
    </>
  );
}

export default BuyEnergy;

