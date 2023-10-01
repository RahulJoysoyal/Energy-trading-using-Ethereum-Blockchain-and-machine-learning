import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import { contractABI, contractAddress } from './Constants/constant';
import Menu from "./Menu";
import { consumerContext, consumerRegTimeContext, producerContext, producerRegTimeContext } from "./context/firstContext";
import './index.css';
const web3 = new Web3(Web3.givenProvider);
const contractaddress = contractAddress; // Replace with your contract's address

function Register() {
  const [producerAddress, setProducerAddress] = useState(null);
  const [consumerAddress,setconsumerAddress] = useState(null);
  const [producerID, setProducerID] = useState(null);
  const [consumerID, setConsumerID] = useState(null);
  const [prodEnergyBal, setProdEnergyBal] = useState(null);
  const [conEnergyBal, setConEnergyBal] = useState(null);
  //const [arr, setArr]= useState([]);

  const {player1, setPlayer1} = useContext(producerContext)
  const {timestampPlayer1, setTimestampPlayer1} = useContext(producerRegTimeContext)
  const {player2, setPlayer2} = useContext(consumerContext)
  const {timestampPlayer2, setTimestampPlayer2} = useContext(consumerRegTimeContext)

  const [producer, setProducer] = useState();
  const [time1, setTime1] = useState();
  const [producerRegistred, setProducerRegistred] = useState(false);
  const [consumer, setConsumer] = useState();
  const [time2, setTime2] = useState();
  const [consumerRegistred, setConsumerRegistred] = useState(false);

  //console.log(player1);
  //console.log(timestampPlayer1)
  

  const fetchProdEvent = async () => {
    const contract = new web3.eth.Contract(contractABI, contractaddress);
    //Subscribe to the event
  contract.events['producerRegistered']({
    }, (error, event) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    // Handle the event data
    setProducer(event.returnValues.producer);
    const newTime1 = new Date().toLocaleDateString(
      undefined,
      {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    setTime1(newTime1);  

  })
    .on('error', (error) => {
      console.error('Error in event subscription:', error);
    });
  }

  
  const fetchConEvent = async()=>{
    const contract = new web3.eth.Contract(contractABI, contractaddress);
    // Subscribe to the event
    contract.events['consumerRegistered']({
    }, (error, event) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    // Handle the event data
    setConsumer(event.returnValues.consumer);
    
    const newTime2 = new Date().toLocaleDateString(
      undefined,
      {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    setTime2(newTime2);  

  })
    .on('error', (error) => {
      console.error('Error in event subscription:', error);
    });
  }
  
  useEffect(()=>{
    fetchProdEvent();
    fetchConEvent();
  },[producerRegistred,consumerRegistred])

  const registerProducer = async() => {
    const newTime2 = new Date().toLocaleDateString(
      undefined,
      {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    
    console.log(`Timestamp onclick ${newTime2}`);

    try {
      const accounts = await web3.eth.requestAccounts();
      const contract = new web3.eth.Contract(contractABI, contractaddress);

      await contract.methods.registerProducer(producerAddress, producerID, prodEnergyBal).send({ from: accounts[0] });
      
      console.log('Producer registered successfully!');
    } catch (error) {
      console.error('Failed to register producer:', error);
    }
    setProducerRegistred(true);


    const newPlayers1 = [...player1];
    newPlayers1.push(producer);
    setPlayer1(newPlayers1);

    //console.log(producerAddress);

    const newTimePlayers1 = [...timestampPlayer1];
    newTimePlayers1.push(time1);
    setTimestampPlayer1(newTimePlayers1)

    // var array = [];
    // array.push(producerAddress);
    // localStorage.setItem('array',array);
    // console.log(array);
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

    setConsumerRegistred(true);

    console.log(consumer)
   
    const newPlayers2 = [...player2];
    newPlayers2.push(consumer);
    setPlayer2(newPlayers2);

    const newTimePlayers2 = [...timestampPlayer2];
    newTimePlayers2.push(time2);
    setTimestampPlayer2(newTimePlayers2)
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
            value={prodEnergyBal}
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
