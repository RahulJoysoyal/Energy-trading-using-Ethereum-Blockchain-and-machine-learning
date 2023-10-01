import React, { useContext } from "react";
import Menu from "./Menu";
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

function Record() {
    var arr = localStorage.getItem('array');

    const {player1, setPlayer1} = useContext(producerContext);
    const {timestampPlayer1, setTimestampPlayer1} = useContext(producerRegTimeContext)

    const {player2, setPlayer2} = useContext(consumerContext);
    const {timestampPlayer2, setTimestampPlayer2} = useContext(consumerRegTimeContext)

    const {offerProducer, setofferProducer} = useContext(offerProducerContext);
    const {offerEnergy, setOfferEnergy} = useContext(offerEnergyAmountContext);
    const {offerPrice, setOfferPrice} = useContext(offerPriceContext);
    const {offerTimestamp, setOfferTimestamp} = useContext(offerTimestampContext);

    const {buyConsumer, setBuyConsumer} = useContext(buyConsumerContext)
    const {buyProducer, setBuyProducer} = useContext(buyProducerContext)
    const {buyEnergyAmount, setBuyEnergyAmount} = useContext(buyEnergyAmountContext)
    const {buyPrice, setBuyPrice} = useContext(buyPriceContext)
    const {buyTimestamp, setBuyTimestamp} = useContext(buyTimestampContext)

    //console.log(player1)
    return (
      <>
      <Menu/>
        <h1>Producer</h1>
        {arr}
        <div>
            {player1.map((item, index) => (
                <p key={index}>{`${item} Registered as Producer on`}<br/>
                {timestampPlayer1[index]}
                </p>
            ))}
        </div>

        <h1>Consumer</h1>
        <div>
            {player2.map((item, index) => (
                <p key={index}>{`${item} Registered as Consumer on`}<br/>
                {timestampPlayer2[index]}
                </p>
            ))}
        </div>
        <h1>Offers</h1>
        <div>
            {offerProducer.map((item, index) => (
                <p key={index}>{`${item} offered`}<br/>
                {`${offerEnergy[index]} KWatt`}<br/>
                {`at a price of ${offerPrice[index]} ether per Unit`}<br/>
                {`on ${offerTimestamp[index]}`}
                </p>
            ))}
        </div>
        <h1>Deals</h1>
        <div>
            {buyConsumer.map((item, index) => (
                <p key={index}>{`${item} Bought`}<br/>
                {`${buyEnergyAmount[index]} KWatt`}<br/>
                {`from ${buyProducer[index]}`}<br/>
                {`at a price of ${buyPrice[index]} ether per Unit`}<br/>
                {`on ${buyTimestamp[index]}`}
                </p>
            ))}
        </div>
      </>
    );
  }

export default Record;