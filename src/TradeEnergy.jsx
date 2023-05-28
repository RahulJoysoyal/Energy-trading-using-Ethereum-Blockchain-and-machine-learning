import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';
import Menu from './Menu';


function Trade() {
    const location = useLocation();
    const [sellAction,setSellAction] = useState('');
    
    function onInput(event) {
      return setSellAction(event.target.value);
    }

    return (
        <>
        <Menu/>
        <div>
        <h1>Only after registration, you will be allowed to buy or sell energy</h1>
        </div>
        <div className='main_div'>
        <div className='options'>
        <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
        <div class="card h-100">
        <img src="https://images.unsplash.com/photo-1642543348781-ed9c6d67ed20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJ1eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" class="card-img-top" alt="buy"/>
        <div class="card-body">
        <h5 class="card-title">Buy Energy</h5>
        <p class="card-text">You can buy energy</p>
        <a href="#" class="btn btn-primary">Buy Now</a>

        </div>
        </div>
        </div>
        <div class="col">
        <div class="card h-100">
        <img src="https://images.unsplash.com/photo-1642543348791-b1cc1b07e756?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="card-img-top" alt="sell"/>
        <div class="card-body">
        <h5 class="card-title">Sell Energy</h5>
        <p class="card-text">You can Sell energy</p>
        <a onClick={onInput} class="btn btn-primary">Sell Now</a>
        </div>
        </div>
        </div>
        </div>
        </div>
                {/*<option>Buy Energy</option>
                <option>Sell Energy</option>*/}
        {/*<div>
        <button>Submit your choice</button>
        </div>*/}
        </div>
        <div>You are now in {location.pathname}</div>
        </>
    );

}

export default Trade;