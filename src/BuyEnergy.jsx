import React, { useState } from 'react';
import {contractABI, contractAddress} from './Constants/constant';
import './index.css';
import Web3 from 'web3';
import Menu from './Menu';
const contractaddress = contractAddress; 
const web3 = new Web3(Web3.givenProvider);

function BuyEnergy() {
  const [producerAddress, setProducerAddress] = useState('');
  const [day, setDay] = useState(0);
  const [price, setPrice] = useState(0);
  const [energy, setEnergy] = useState(0);

  const buyEnergy = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);
      await contract.methods.buy_energy(producerAddress, day, price, energy).send({ from: accounts[0], gas: 6721975});

      console.log('Transaction successful');
    } catch (error) {
      console.error('Error while buying energy:', error);
    }
  };

  return (
    <>
      <Menu/>
      <div className='main_div'>
    <div className='center_div2'>
    <h1>Buy Energy</h1>
    <label>
    Producer Address:
          <input
            type="text"
            placeholder='Producer Address'
            value={producerAddress}
            onChange={(e) => setProducerAddress(e.target.value)}
          />
    </label>
        <br />
        <label>
        Days:
          <input
            type="number"
            placeholder='Days'
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          </label>
        <br />
        <label>
        Price:
          <input
            type="number"
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          </label>
        <br />
        <label>
        Energy Amount:
          <input
            type="number"
            placeholder='Energy amount'
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
          />
          </label>
        <br />
        <div className='connected-container3'>
      <button onClick={buyEnergy}>Buy</button>
      </div>
        </div>
        </div>
    </>
  );
}

export default BuyEnergy;
