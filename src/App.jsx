import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import About from './About';
import BuyEnergy from "./BuyEnergy";
import Chart from './Chart';
import Connected from './Components/Connected';
import Home from './Home';
import OfferEnergy from './OfferEnergy';
import Record from './Record';
import Register from './Register';
import Search from './Search';
import Trade from './TradeEnergy';
import {
  buyConsumerContext,
  buyEnergyAmountContext, buyPriceContext,
  buyProducerContext,
  buyTimestampContext,
  consumerContext, consumerRegTimeContext,
  offerEnergyAmountContext, offerPriceContext,
  offerProducerContext,
  offerTimestampContext,
  producerContext, producerRegTimeContext
} from './context/firstContext';
import './index.css';

function App() {
  const [provider,setProvider] = useState('');
  const [account,setAccount] = useState('');
  const [isConnect,setIsConnected] = useState(false);

  const [player1, setPlayer1] = useState([]);
  const [timestampPlayer1, setTimestampPlayer1] = useState([])
  const [player2, setPlayer2] = useState([]);
  const [timestampPlayer2, setTimestampPlayer2] = useState([])

  const [offerProducer, setOfferProducer] = useState([]);
  const [offerEnergy, setOfferEnergy] = useState([]);
  const [offerPrice, setOfferPrice] = useState([]);
  const [offerTimestamp, setOfferTimestamp] = useState([]);

  const [buyConsumer, setBuyConsumer] = useState([]);
  const [buyProducer, setBuyProducer] = useState([]);
  const [buyEnergyAmount, setBuyEnergyAmount] = useState([]);
  const [buyPrice, setBuyPrice] = useState([]);
  const [buyTimestamp, setBuyTimestamp] = useState([]);

  useEffect( () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
  })

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }
  return (
    <>
    <producerContext.Provider value={{player1, setPlayer1}}>
      <producerRegTimeContext.Provider value={{timestampPlayer1, setTimestampPlayer1}}>
        <consumerContext.Provider value={{player2, setPlayer2}}>
          <consumerRegTimeContext.Provider value={{timestampPlayer2, setTimestampPlayer2}}>
            <offerProducerContext.Provider value={{offerProducer, setOfferProducer}}>
              <offerEnergyAmountContext.Provider value={{offerEnergy, setOfferEnergy}}>
                <offerPriceContext.Provider value={{offerPrice, setOfferPrice}}>
                  <offerTimestampContext.Provider value={{offerTimestamp, setOfferTimestamp}}>
                    <buyConsumerContext.Provider value={{buyConsumer, setBuyConsumer}}>
                      <buyProducerContext.Provider value={{buyProducer, setBuyProducer}}>
                        <buyEnergyAmountContext.Provider value={{buyEnergyAmount, setBuyEnergyAmount}}>
                          <buyPriceContext.Provider value={{buyPrice, setBuyPrice}}>
                            <buyTimestampContext.Provider value={{buyTimestamp, setBuyTimestamp}}>
                              <Routes>
                              <Route path='/' Component={Home} exact/>
                              <Route path='/register' Component={Register} exact/>
                              <Route path='/about' Component={About} exact/>
                              <Route path='/trade' Component={Trade} exact/>
                              <Route path='/search' Component={Search} exact/>
                              <Route path="/offer" Component={OfferEnergy}/>
                              <Route path="/buy" Component={BuyEnergy}/>
                              {/*<Route Component={Error}/>*/}
                              <Route path="*" element={<Navigate to ="/" />}/>
                              <Route path='/offer' Component={OfferEnergy} exact/>
                              <Route path='/chart' Component={Chart} exact/>
                              <Route path='/connected' Component={Connected} exact/>
                              <Route path='/Record' Component={Record} exact/>
                              </Routes>
                            </buyTimestampContext.Provider>
                          </buyPriceContext.Provider>
                        </buyEnergyAmountContext.Provider>
                      </buyProducerContext.Provider>
                    </buyConsumerContext.Provider>
                  </offerTimestampContext.Provider>
                </offerPriceContext.Provider>
              </offerEnergyAmountContext.Provider>
            </offerProducerContext.Provider>
          </consumerRegTimeContext.Provider>
        </consumerContext.Provider>
      </producerRegTimeContext.Provider>
    </producerContext.Provider>
    </>
  );
}
export default App;