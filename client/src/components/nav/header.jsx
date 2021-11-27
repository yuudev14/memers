import React from "react";
import AuthHeaderBtn from "./authHeaderBtn";
import "../../styles/nav/header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">
          <h1>Memers</h1>
        </Link>
        <AuthHeaderBtn />
      </nav>
    </header>
  );
};

export default Header;
