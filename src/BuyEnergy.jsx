import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { contractABI, contractAddress } from './Constants/constant';
import Menu from './Menu';
import {
  buyConsumerContext,
  buyEnergyAmountContext, buyPriceContext,
  buyProducerContext,
  buyTimestampContext
} from './context/firstContext';
import './index.css';
const contractaddress = contractAddress; 
const web3 = new Web3(Web3.givenProvider);

function BuyEnergy() {
  const [producerAddress, setProducerAddress] = useState('');
  const [day, setDay] = useState(0);
  const [price, setPrice] = useState(0);
  const [energy, setEnergy] = useState(0);

const [consumer, setConsumer] = useState();
const [producer, setProducer] = useState();
const [energyBuy, setEnergyBuy] = useState();
const [priceBuy, setPriceBuy] = useState();
const [time, setTime] = useState();

const [ energyBuyEvent, setEnergyBuyEvent] = useState(false)

const {buyConsumer, setBuyConsumer} = useContext(buyConsumerContext)
const {buyProducer, setBuyProducer} = useContext(buyProducerContext)
const {buyEnergyAmount, setBuyEnergyAmount} = useContext(buyEnergyAmountContext)
const {buyPrice, setBuyPrice} = useContext(buyPriceContext)
const {buyTimestamp, setBuyTimestamp} = useContext(buyTimestampContext)

const fetchBuyEvent = async()=>{
  const contract = new web3.eth.Contract(contractABI, contractaddress);
  // Subscribe to the event
  contract.events['Deal']({
  }, (error, event) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  // Handle the event data
  setProducer(event.returnValues.producer)
  console.log(producer);

  setEnergyBuy(event.returnValues.energy)


  setPriceBuy(event.returnValues.price)


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
    //setBid();
}

  useEffect(()=>{
    fetchBuyEvent();
  },[energyBuyEvent])

  const buyEnergy = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      const signer = accounts[0];
      
      setConsumer(signer)

      const contract = new web3.eth.Contract(contractABI, contractaddress);
      //await contract.methods.buy_energy(producerAddress, day, price, energy).send({ from: accounts[0], gas: 6721975});

      // Send Ether to the contract
      const calculatedAmount = price*energy*.0000001;
        const amountToSend = web3.utils.toWei(calculatedAmount.toString(), 'ether');
        // await web3.eth.sendTransaction({
        //     to: contract.options.address,
        //     from: signer,
        //     value: amountToSend
        // })
      await contract.methods.buy_energy(producerAddress, day, price, energy).send({ from:accounts[0], value: amountToSend });

      //await contract.methods.buy_energy(producerAddress, day, price, energy,{ value: item.cost })
      console.log('Transaction successful');
    } catch (error) {
      console.error('Error while buying energy:', error);
    }
    setEnergyBuyEvent(true);

    const newOfferConsumer = [...buyConsumer];
    newOfferConsumer.push(consumer);
    setBuyConsumer(newOfferConsumer)    

    const newOfferProducer = [...buyProducer];
    newOfferProducer.push(producer);
    setBuyProducer(newOfferProducer)

    const newBuyEnergy = [...buyEnergyAmount];
    newBuyEnergy.push(energyBuy);
    setBuyEnergyAmount(newBuyEnergy)

    const newOfferPrice = [...buyPrice];
    newOfferPrice.push(priceBuy);
    setBuyPrice(newOfferPrice)

    const newTimestampBuy = [...buyTimestamp];
    newTimestampBuy.push(time);
    setBuyTimestamp(newTimestampBuy)
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
