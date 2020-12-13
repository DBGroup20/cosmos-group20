import React from 'react';
import { Link, useHistory } from 'react-router-dom';


function Signout() {
    return (
        <div>
            <h1>You have signed out</h1>
            <Link to="/login">
                <p>Click here to login</p>

            </Link>
        </div>
    )
}

export default Signout
