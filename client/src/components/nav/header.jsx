import React from 'react';
import AuthHeaderBtn from './authHeaderBtn';
import "../../styles/nav/header.scss";
import { useSelector } from 'react-redux';

const Header = () => {
  const auth = useSelector(state => state.auth);

 return (
    <header>
      <nav>
        <h1 onClick={() => console.log(auth)}>Memers</h1>
        <AuthHeaderBtn />
      </nav>
    </header>
  )
}

export default Header
