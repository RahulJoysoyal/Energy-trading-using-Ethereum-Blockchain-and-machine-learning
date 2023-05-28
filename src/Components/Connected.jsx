import React, { useState } from 'react';
import '../index';
import Menu from '../Menu';
import { Link, useNavigate } from 'react-router-dom';

function Connected(props) {
    const history = useNavigate('');
    return (
        <>
        <Menu/>
        <h1>Welcome to the Peer-to-peer Energy trading Platform</h1>
        <div className="connected-container">
        <h1 className="connected-header">You are connected to Metamask</h1>
        <p className='connected-account'>Metamask account: {props.account}</p>
        <Link  to="/register"><button className='login-button'>Register Now</button></Link>
        <Link  to="/trade"><button className='login-button'>Buy or Sell Now</button></Link>
        </div>
        </>

    );
}

export default Connected;