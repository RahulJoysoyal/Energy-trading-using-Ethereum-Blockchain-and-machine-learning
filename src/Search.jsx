import React, { useState } from 'react';
import Sresult from './Sresult';
import './index.css';


function Search() {
    const [img,setImg] = useState("");

    function dialEvent(event) {
        return setImg(event.target.value);
    }

    return (
        <>
        <div className='searchbar'>
        <input type='text' placeholder='Search here' value={img} onChange={dialEvent}/>
        {img?<Sresult name={img}/>:null}
        </div>
        </>
    );
}

export default Search;