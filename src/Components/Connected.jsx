import React, { useState } from 'react';
import '../index';
import Menu from '../Menu';
import {Register} from '../Register';
import { useNavigate } from 'react-router-dom';

function Connected(props) {
    const history = useNavigate('');
    return (
        <>
        <Menu/>
        <h1>Welcome to the Peer-to-peer Energy trading Platform</h1>
        <div className="connected-container">
        <h1 className="connected-header">You are connected to Metamask</h1>
        <p className='connected-account'>Metamask account: {props.account}</p>
        <p className='text-center' style={{background:'transparent'}}>Register now to trade energy</p>
        </div>
        </>

    );
}

export default Connected;