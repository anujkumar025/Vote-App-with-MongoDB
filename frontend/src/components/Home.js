import React, {useState, useContext} from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../context/LoginContext';
import BackendAddress from './../helper/Helper.js';

const Home = () =>{
    const {userEmail} = useContext(LoginContext);
    const navigate = useNavigate();

    const handleMyElection = async () => {
        await axios.post(BackendAddress + "myelectiondata", {userEmail})
        .then(res=>{
            if(res.data.message !== 'No data present'){
                // console.log(res.data.dataPacket);
                navigate('/myelection', {state: {dataPacket:res.data.dataPacket}});
            }
            else if(res.data.message === "No data present"){
                alert(res.data.message);
            }
        })
    }

    const handleCreateQuizButton = () =>{
        navigate('/createquiz');
    }
    const handleParticipateButton = () =>{
        navigate('/findelection');
    }

    return(
        <div className='main'>
            <div className='Home-main-upper'>
                <button className='Home-my-election-button' onClick={handleMyElection}>My Elections</button>
            </div>
            <div className='Home-main-bottom'>
                <div className='left'>
                    <button className='button1 button12' onClick={handleCreateQuizButton}>Create Quiz</button>
                    <button className='button1 button22' onClick={handleParticipateButton}>Participate in Quiz</button>
                </div>
                <div className='right'>

                </div>
            </div>
        </div>
    );
}



export default Home;