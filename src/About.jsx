import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <>
        <h2>
        Peer-to-peer (P2P) energy trading allows for Prosumers to share/sell 
        their excess generated energy with Consumers. The trading of energy is done 
        through a secured platform, often using technology like blockchain.
        </h2>
        <div className='connected-container2'>
        <Link  to="/connected"><button className='login-button'>Go back</button></Link>
        </div>
        </>
    );
}

export default About;