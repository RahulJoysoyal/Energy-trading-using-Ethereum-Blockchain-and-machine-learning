import React from 'react';
import './index.css';

function Sresult(props) {
    const img = `https://source.unsplash.com/500x500/?${props.name}`;
    return (
        <>
            <div>
                <img src={img} alt='random search'/>
            </div>
        </>
    );
}

export default Sresult;