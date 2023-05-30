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
  const [bid, setBid] = useState([]);


  const showBids= async ()=>{
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);
      alert(setBid(await contract.methods.showBids(idx)).send({ from: accounts[0] }));
  }catch(error){
    alert("Can not load this bid")
  }
}

  const buyEnergy = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);
      await contract.methods.buy_energy(producerAddress, buyDay, bidPrice, bidEnergy).send({ from: accounts[0] });
      alert('Energy Bid successfully!');
    } catch (error) {
      alert('Failed to Bid Energy:', error);
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
        <h6>Prosumer Address: {bid[0]}</h6>
        <h6>Bidding_Day: {bid[1]}</h6>
        <h6>Price per Unit: {bid[2]}</h6>
        <h6>Offered Energy: {bid[3]}</h6>
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
        onChange={(e) => setBuyDay(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Bid Price"
        value={bidPrice}
        onChange={(e) => setBidPrice(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Amount of Energy"
        value={bidEnergy}
        onChange={(e) => setBidEnergy(e.target.value)}
      />
      <br/>
      <button onClick={buyEnergy}>Buy Energy</button>
    </div>
    </div>
    </>
  );
}

export default BuyEnergy;