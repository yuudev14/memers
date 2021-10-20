import React from 'react';
import AuthHeaderBtn from './authHeaderBtn';
import "../../styles/nav/header.scss";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const auth = useSelector(state => state.auth);

 return (
    <header>
      <nav>
        <Link to="/"><h1>Memers</h1></Link>
        <AuthHeaderBtn />
      </nav>
    </header>
  )
}

export default Header
