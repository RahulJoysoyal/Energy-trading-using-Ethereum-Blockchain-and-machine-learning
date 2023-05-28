import React from 'react';
import '../index';

function Login(props) {
    return (
        <div className="login-container">
        <h1 className="welcome-message">Welcome to decentralized energy trading application</h1>
        <button className="login-button" onClick = {props.connectWallet}>Connect to Metamask</button>
        </div>
    );
}

export default Login;