import React, {useContext, useState} from 'react';
import { LoginContext } from '../context/LoginContext';
import './Logcheck.css';
import axios from 'axios';


function Logcheck() {
    const {userEmail, logout} = useContext(LoginContext);
    const [userName, setUserName] = useState('');

    // console.log("Email : " + userEmail);

    axios.post("http://localhost:5000/username", {email : userEmail})
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

        return (
            <div className='Logcontainer'>
                <span className='header__optionLineOne'>Hello Guest</span>
                <a href="/login" className='header__optionLineTwo'>Sign In</a>
            </div>
        )
    }
    else{
        return (
            <div className='Logcontainer'>
                <a href='/#' className='header__optionLineTwo'>{userName}</a>
                <a href='/' className='header__optionLineTwo' onClick= {logoutprocess}>Logout</a>
            </div>
        )
    }
}

export default Logcheck;