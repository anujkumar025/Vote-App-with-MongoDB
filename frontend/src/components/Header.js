import React from 'react';
import './Header.css';
import logo from "./../images/logo.jpg";
import Logcheck from './Logcheck';

const Header = () => {
  return (
    <header className='header'>
      <div className='left-header'>
        <a href="/"><img src={logo} alt="Logo" className='logo'/></a>
      </div>
      <div className='middle'>
        <h1>Voting App</h1>
      </div>
      <div className='right-header'>
        <Logcheck/>
      </div>
    </header>
  );
};

export default Header;
