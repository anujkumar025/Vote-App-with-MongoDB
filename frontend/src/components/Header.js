import React from 'react';
import './Header.css';
import logo from "./../images/logo.png";
import { useNavigate } from 'react-router-dom';
import Logcheck from './Logcheck';

const Header = () => {
  const navigate = useNavigate();

  const handleMyElection = async () => {
    navigate('/myelection');
  }
  return (
    <div className='header'>
      <div className='left-header'>
        <div className='Home-main-upper'>
        <div className='title-block'>
            <a href="/"><img src={logo} alt="Logo" className='logo'/></a>
            <div>
              <h1 id='Head-h1'>A-Know</h1>
            </div>
          </div>
        </div>
        <div>
          <button className='Home-my-election-button' onClick={handleMyElection}>My Elections</button>
        </div>
      </div>
      <div className='middle'>
      </div>
      <div className='right-header'>
        <Logcheck/>
      </div>
    </div>
  );
};

export default Header;
