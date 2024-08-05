import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../../context/LoginContext';
import './MyElection.css';
import BackendAddress from './../../helper/Helper.js';


export const MyElection = () => {
    const {userEmail} = useContext(LoginContext);
    const [dataPresent, setDataPresent] = useState(false);
    const [dataPacket, setDataPacket] = useState(); 
    const [countReq, setCountReq] = useState(true);
    const navigate = useNavigate();
    

    if(countReq){
        setCountReq(false);
        const getdata = async () => {
    
            await axios.post(BackendAddress + "myelectiondata", {userEmail})
            .then(res=>{
                if(res.data.message !== 'No data present'){
                    setDataPacket(res.data.dataPacket);
                    setDataPresent(true);
                }
                else if(res.data.message === "No data present"){
                    alert(res.data.message);
                }
            })
        }
        getdata();
    }

    
    if(dataPresent){

        const handleGetMoreData = async (quiz_id) => {
            await axios.post(BackendAddress + "getresult", {userEmail, quiz_id})
            .then(res=>{
                if(res.data.message !== 'No data present'){
                    // setDataPacket(res.data.dataPacket);
                    // console.log(res.data.packet);
                    navigate('/myelection/result', {state: {packet: res.data.packet}});
                    // setDataPresent(true);
                }
                else if(res.data.message === "No data present"){
                    alert(res.data.message);
                }
            })
        }

        return (
        <div className='myelect-main'>
            <div className='myelect-box'>
            {dataPacket.map((quiz, index) => (
                <div key={index}>
                    <div>
                        <h1>Title: {quiz.title}</h1>
                        <p>Description: {quiz.description}</p>
                        <p>Deadline: {new Date(quiz.date).toLocaleString()}</p>
                    </div>
                    <div className='myelect-delete-box'>
                        <button onClick={() => handleGetMoreData(quiz._id)}>More Details</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
        );
    }
    else{
        return(
            <div>wait</div>
        )
    }    
}
