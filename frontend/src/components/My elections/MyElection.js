import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../../context/LoginContext';
import './MyElection.css';

export const MyElection = () => {
    const {userEmail} = useContext(LoginContext);
    const [dataPresent, setDataPresent] = useState(true);
    var location = useLocation();
    const navigate = useNavigate();
    
    if(dataPresent){
        const electionData = location.state.dataPacket[0];
        const questionData = location.state.dataPacket[1];
        const title = electionData.title;
        const desc = electionData.description;
        const deadline = electionData.date;
        var ques=[];
        var opt=[];
        var whoAttempted=[];
        var whoChoseRight=[];
        var correctOpt = [];
        var j;
        for (j in questionData){
            ques.push(questionData[j].question);
            opt.push(questionData[j].options);
            whoChoseRight.push(questionData[j].peopleWhoChoseRight);
            whoAttempted.push(questionData[j].peopleWhoAttempted);
            correctOpt.push(questionData[j].correctOption);
        }

        const handleDeleteElection = async () =>{
            await axios.post("http://localhost:5000/deleteElection", {userEmail})
            .then(res =>{
                alert(res.data.message);
                setDataPresent(false);
            })
        }

        return (
        <div className='myelect-main'>
            <div className='myelect-box'>
                <div>
                    <h1>Title: {title}</h1>
                    <p>Description: {desc}</p>
                    <p>Deadline: {new Date(deadline).toLocaleString()}</p>
                    <h2>Questions:</h2>
                </div>
            <div className='myelect-Question-box'>
                {ques.map((question, index) => (
                    <div className='myelect-each-ques' key={index}>
                        <p className='myelect-light-color'>Question {index + 1}: {question}</p>
                        <ul className='myelect-light-color'>
                        {opt[index].map((option, optIndex) => (
                            <li  className='myelect-light-color' key={optIndex}>Option {optIndex + 1}: {option}</li>
                        ))}
                        </ul>
                        <p className='myelect-light-color'>Correct Option: {correctOpt[index]+1}</p>
                        <div>
                            <h3 className='myelect-light-color'>Correct: {whoChoseRight[index]} / Total Attempt: {whoAttempted[index]}</h3>
                            {/* <br></br> */}
                        </div>
                    </div>
                ))}  
            </div>
            </div>
            <div className='myelect-delete-box'>
                <button onClick={handleDeleteElection}>Delete this elecion</button>
            </div>
        </div>
        );
    }
    else{
        navigate('/');
    }    
}
