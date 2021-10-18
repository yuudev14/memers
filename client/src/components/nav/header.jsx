import React from 'react';
import AuthHeaderBtn from './authHeaderBtn';
import "../../styles/nav/header.scss";

const Header = () => {
 return (
    <header>
      <nav>
        <h1>Memers</h1>
        <AuthHeaderBtn />
      </nav>
    </header>
  )
}

export default Header
