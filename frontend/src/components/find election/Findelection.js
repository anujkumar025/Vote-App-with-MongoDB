import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export const Findelection = () => {
    const [objId, setObjId] = useState('');
    const [dataOfElection, setDataOfElection] = useState('');
    const [isAuthentic, setIsAuthentic] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(new Array(15).fill(''));
    const navigate = useNavigate();


    if(!isAuthentic){
        function handleCodeChange(e){
            setObjId(e.target.value);
            // console.log(objId);
        }
        
        async function handleSubmit(){
            if(objId){
                await axios.post("http://localhost:5000/findelection", {objId})
                .then(res=>{
                    if(res.data.message){
                        alert(res.data.message);
                        setDataOfElection(res.data.packet);
                        setIsAuthentic(true);
                        // console.log(res.data.packet);
                        // navigate('/');
                    }  
                    else{   
                        alert("some error occured please try again");
                    }
                })
            }
            else{
                alert("Invalid input");
            }
        }
    
      return (
        <div className='Find-main'>
            <div>
                <h2>Enter Election Code</h2>
                <input type='text' onChange={handleCodeChange}/>
                <br></br>
                <br></br>
                <button onClick={handleSubmit}>Search</button>
            </div>
        </div>
      )
    }
    else{
        const { title, desc, deadline, ques, opt, QObjId } = dataOfElection;

        const handleOptionChange = (index, value) => {
            const newSelectedOptions = [...selectedOptions];
            newSelectedOptions[index] = index;
            setSelectedOptions(newSelectedOptions);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            // console.log(dataOfElection);
            if(selectedOptions.length !== 0)
                await axios.post("http://localhost:5000/checkresult", {selectedOptions, objId, QObjId:dataOfElection.QobjId})
                .then(res=>{
                    if(res.data.message){
                        alert(res.data.message);
                    }
                    else{
                        alert("Try again");
                    }
                })
            else{
                alert("Invalid input");
            }
        };
        return(
            <div>
            <h1>Title: {title}</h1>
            <p>Description: {desc}</p>
            <p>Deadline: {new Date(deadline).toLocaleString()}</p>
      
            <form onSubmit={handleSubmit}>
              <h2>Questions:</h2>
              {ques.map((question, index) => (
                <div key={index}>
                  <p>Question {index + 1}: {question}</p>
                  <ul>
                    {opt[index].map((option, optIndex) => (
                      <li key={optIndex}>
                        <label>
                          <input
                            type="radio"
                            name={`question_${index}`}
                            value={option}
                            checked={selectedOptions[index] === option}
                            onChange={() => handleOptionChange(index, option)}
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          </div>
        );
    }
}
