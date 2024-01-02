import React, {useContext, useState} from 'react';
import { LoginContext } from '../context/LoginContext';
import './Logcheck.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import BackendAddress from './../helper/Helper.js';



function Logcheck() {
    const {userEmail, logout} = useContext(LoginContext);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    // console.log("Email : " + userEmail);

    axios.post(BackendAddress + "username", {email : userEmail})
    .then(res => {
        if(res.data.message !== "error 404"){
            // console.log(res.data.message);
            setUserName(res.data.message);
            // console.log(userName);
        } 
        // if(res.data.message === "error 404"){
        //     console.log(userName);
        // }
    })

    function logoutprocess(){
        logout();
        setUserName('');
    }

    
    if (userName.length === 0) {
        
        const handleButton = () => {
            navigate('/login');
        }
        return (
            <div className='Logcontainer'>
                <div className='header__optionLineOne'>Hello Guest</div>
                <button onClick={handleButton} className='header__optionLineTwo'>Sign In</button>
            </div>
        )
    }
    else{
        return (
            <div className='Logcontainer'>
                <div className='header__optionLineOne'>{userName}</div>
                <button className='header__optionLineTwo' onClick= {logoutprocess}>Logout</button>
            </div>
        )
    }
}

export default Logcheck;