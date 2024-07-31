import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../../context/LoginContext';
import './../My elections/MyElection.css';
import BackendAddress from './../../helper/Helper';


export const Result = () => {
    const {userEmail} = useContext(LoginContext);
    const [dataPresent, setDataPresent] = useState(true);
    var location = useLocation();
    const navigate = useNavigate();
    
    if(dataPresent){
        const quizData = location.state.packet;
        // console.log(quizData);
        const title = quizData.title;
        const desc = quizData.description;
        const deadline = quizData.date;
        // var ques=[];
        // var opt=[];
        // var whoAttempted=[];
        // var whoChoseRight=[];
        // var correctOpt = [];
        // var j;
        // for (j in quizData){
        //     ques.push(quizData[j].question);
        //     opt.push(quizData[j].options);
        //     whoChoseRight.push(quizData[j].peopleWhoChoseRight);
        //     whoAttempted.push(quizData[j].peopleWhoAttempted);
        //     correctOpt.push(quizData[j].correctOption);
        // }

        const handleDeleteElection = async () =>{
            await axios.post(BackendAddress + "deleteElection", {userEmail})
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
                {quizData.ques.map((ques, index) => (
                    <div className='myelect-each-ques' key={index}>
                        <p className='myelect-light-color'>Question {index + 1}: {ques[index]}</p>
                        <ul className='myelect-light-color'>
                        {quizData.options[index].map((option, optIndex) => (
                            <li  className='myelect-light-color' key={optIndex}>Option {optIndex + 1}: {option}</li>
                        ))}
                        </ul>
                        <p className='myelect-light-color'>Chosen Option : {quizData.chosenOption[index]+1}</p>
                        <p className='myelect-light-color'>Is correct : {(quizData.isCorrect[index])? "True":"False"}</p>
                        {/* <div>
                            <h3 className='myelect-light-color'>Correct: {whoChoseRight[index]} / Total Attempt: {whoAttempted[index]}</h3>
                        </div> */}
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