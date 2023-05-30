import React, { useState } from 'react';
import Web3 from 'web3';
import './index.css';
import {contractABI, contractAddress} from './Constants/constant';
import Menu from "./Menu";
import { Link } from 'react-router-dom';
const web3 = new Web3(Web3.givenProvider);
const contractaddress = contractAddress; // Replace with your contract's address

function OfferEnergy() {
  const [aday,setAday] = useState('');
  const [aPriceMax,setApriceMax] = useState('');
  const [aPriceMin,setApriceMin] = useState('');
  const [amaxEnergy,setAmaxEnergy] = useState('');
  const [aminEnergy,setAminEnergy] = useState('');
  const [timestamp,setTimestamp] = useState('');


  const SellEnergy = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);

      await contract.methods.offer_energy(aday, aPriceMax, aPriceMin, amaxEnergy, aminEnergy, timestamp).send({ from: accounts[0] });

      console.log('Energy offered successfully!');
    } catch (error) {
      console.error('Failed to offer Energy:', error);
    }
  };

  return (
    <>
    <Menu/>
    <div className='main_div'>
    <div className='center_div2'>
      <h1>Offer Your Energy</h1>
      <input
        type="number"
        placeholder="Enter Days"
        value={aday}
        onChange={(e) => setAday(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Set Maximum price"
        value={aPriceMax}
        onChange={(e) => setApriceMax(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Set Minimum price"
        value={aPriceMin}
        onChange={(e) => setApriceMin(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Set Maximum amount of Energy"
        value={amaxEnergy}
        onChange={(e) => setAmaxEnergy(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Set Minimum amount of Energy to be sold:"
        value={aminEnergy}
        onChange={(e) => setAminEnergy(e.target.value)}
      />
      <br/>
      <input
        type="number"
        placeholder="Set timestamp"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
      />
      <div className='connected-container3'>
      <button onClick={SellEnergy}>Offer Energy</button>
      </div>
      <div className='connected-container4'>
      <Link  to="/trade"><button className='login-button'>Click here to Buy or Sell Now</button></Link>
      </div>
    </div>
    </div>
    </>
  );
}

export default OfferEnergy;

