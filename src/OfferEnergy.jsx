import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import { contractABI, contractAddress } from './Constants/constant';
import Menu from "./Menu";
import {
  offerEnergyAmountContext, offerPriceContext,
  offerProducerContext,
  offerTimestampContext
} from './context/firstContext';
import './index.css';
const web3 = new Web3(Web3.givenProvider);
const contractaddress = contractAddress; 

function OfferEnergy() {
  const [aday,setAday] = useState('');
  const [aPriceMax,setApriceMax] = useState('');
  const [aPriceMin,setApriceMin] = useState('');
  const [amaxEnergy,setAmaxEnergy] = useState('');
  const [aminEnergy,setAminEnergy] = useState('');
  const [timestamp,setTimestamp] = useState('');


  const [energyOffered, setEnergyOffered] = useState(false);

  const [producer, setProducer] = useState();
  const [time, setTime] = useState();
  const [price, setPrice] = useState();
  const [energyAmount, setEnergyAmount] = useState();

  const {offerProducer, setOfferProducer} = useContext(offerProducerContext);
  const {offerEnergy, setOfferEnergy} = useContext(offerEnergyAmountContext);
  const {offerPrice, setOfferPrice} = useContext(offerPriceContext);
  const {offerTimestamp, setOfferTimestamp} = useContext(offerTimestampContext);

  const fetchOfferEvent = async()=>{
    const contract = new web3.eth.Contract(contractABI, contractaddress);
    // Subscribe to the event
    contract.events['BidMade']({
    }, (error, event) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    // Handle the event data
    setProducer(event.returnValues.producer)
    //console.log(producer);
    setEnergyAmount(event.returnValues.energy)
    setPrice(event.returnValues.price)

    const newTime = new Date().toLocaleDateString(
      {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    setTime(newTime); 

  })
    .on('error', (error) => {
      console.error('Error in event subscription:', error);
    });
  }

  useEffect(()=>{
    fetchOfferEvent();
  },[energyOffered])

  const SellEnergy = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);

      await contract.methods.offer_energy(aday, aPriceMax, aPriceMin, amaxEnergy, aminEnergy, timestamp).send({ from: accounts[0] });

      console.log('Energy offered successfully!');
    } catch (error) {
      console.error('Failed to offer Energy:', error);
    }
    setEnergyOffered(true);

    const newOfferProducer = [...offerProducer];
    newOfferProducer.push(producer);
    setOfferProducer(newOfferProducer)

    const newOfferEnergy = [...offerEnergy];
    newOfferEnergy.push(energyAmount);
    setOfferEnergy(newOfferEnergy)

    const newOfferPrice = [...offerPrice];
    newOfferPrice.push(price);
    setOfferPrice(newOfferPrice)

    const newTimestampOffer = [...offerTimestamp];
    newTimestampOffer.push(time);
    setOfferTimestamp(newTimestampOffer)
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