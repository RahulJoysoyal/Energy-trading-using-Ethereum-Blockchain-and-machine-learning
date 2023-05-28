import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';


function Menu() {
    return (
        <>
        <Link className='active_class' style={{margin:'5px'}} to="/">Intro </Link>
        {/*<Link className='active_class' style={{margin:'5px'}} to="/register">Register </Link>*/}
        <Link className='active_class' style={{margin:'5px'}} to="/trade">Buy/Sell </Link>
        {/*<Link className='active_class' style={{margin:'5px'}} to="/search">Search</Link>*/}
        <Link className='active_class' style={{margin:'5px'}} to="/about">About this </Link>

        
        {/*<a style={{margin:'5px'}} href='/'>Intro</a>
        <a style={{margin:'5px'}} href='/register'>Register</a>
        <a style={{margin:'5px'}} href='/about'>About Us</a>*/}
        </>
    );
}

export default Menu;