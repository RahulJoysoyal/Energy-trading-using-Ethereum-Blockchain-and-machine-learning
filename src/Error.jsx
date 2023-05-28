import React from 'react';
import { Link } from 'react-router-dom';


function Error() {
    return (
        <>
        <div>
        <h1>Oops! Page not found</h1>
        <Link to="/">Go Back</Link>
        </div>
        </>
    );
}

export default Error;