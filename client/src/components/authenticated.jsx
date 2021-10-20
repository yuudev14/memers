import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const Authenticated = ({ children }) => {
    const { auth} = useSelector(state => state.auth);
    return ( 
        <Fragment >
            { !auth ? <Redirect to="/sign-in" /> : children}
            
        </Fragment>
    )
}

export default Authenticated