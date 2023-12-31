import React, { useState, useContext } from 'react';
import './Addquestion.css';
import axios from 'axios';
import { LoginContext } from '../context/LoginContext';
import clipsvg from './../images/copy2clipboard.svg'



function AddQuestion() {
  const [submitted, setSubmitted] = useState(false);
  const {userEmail} = useContext(LoginContext);
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctOption: 0, userEmail: userEmail }
  ]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [codeOfElection, setCodeOfElection] = useState('');

  // var codeOfElection;

  // const [title, setTitle] = useState('');

  // const handleTitleChange = (e) => {
  //   setTitle(e);
  //   // console.log(title);
  // }

  if(!submitted){
    const handleQuestionChange = (index, value) => {
      const updatedQuestions = [...questions];
      updatedQuestions[index].question = value;
      setQuestions(updatedQuestions);
    };
  
    // const handleQuestionIndex = (index, value)=>{
      
    // }
  
    const handleOptionChange = (questionIndex, optionIndex, value) => {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      setQuestions(updatedQuestions);
    };
  
    const handleCorrectOptionChange = (questionIndex, value) => {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].correctOption = value;
      setQuestions(updatedQuestions);
    };
  
    const handleAddQuestion = () => {
      const updatedQuestions = [
        ...questions,
        { question: '', options: ['', '', '', ''], correctOption: 0, userEmail:userEmail }
      ];
      setQuestions(updatedQuestions);
      setQuestionIndex(questionIndex+1);
    };
  
    // const handleSaveQuestion = (Index, check=false) =>{
    //   // console.log(allQuesArray);
    // }
  
    async function handleSubmit(){
      const allQuesArray = [...questions];
      // console.log(allQuesArray);
      axios.post("http://localhost:5000/addq", allQuesArray)
      .then(res => {
        if(res.data.message === "Question saved successfully"){
          // alert(res.data.message);
          setCodeOfElection(res.data.codeOfElection);
          setSubmitted(true);
        }
        else{
          alert("Some error occured please try again");
        } 
      })
    }
  
    const handleDeleteQuestion = (questionIndex) => {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(questionIndex, 1);
      setQuestions(updatedQuestions);
    };
  
    return (
      <div className="AddQ-input-box">
        <div className='quiz-input-box'>
        <h1>Quiz Question Input</h1>
        {questions.map((q, questionIndex) => (
          <div key={questionIndex} className="question-container">
            <input
              type="text"
              className='AddQQ'
              placeholder={`Question ${questionIndex + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            />
            <div className="options-container">
              {q.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(questionIndex, optionIndex, e.target.value)
                    }
                  />
                  <input
                    type="radio"
                    name={`correctOption-${questionIndex}`}
                    checked={q.correctOption === optionIndex}
                    onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
                  />
                  <label>Correct</label>
                </div>
              ))}
            </div>
              <button onClick={() => handleDeleteQuestion(questionIndex)}>Delete</button>
              {/* <button onClick={() => handleSaveQuestion(questionIndex)}>Save</button> */}
          </div>
        ))}
        <div className="AddQ-button-group">
        <button onClick={handleAddQuestion}>Add Question</button>
        <button onClick={handleSubmit}>Submit</button>
        </div>
        </div>
      </div>
    );
  }
  else{
    const copyToClipboard = () => {
      navigator.clipboard.writeText(codeOfElection);
      
      setTimeout(() => {
        
      }, 500);
    };
    return(
      <div className='AddQ-submitted-box'>
        <div>
          <h1>Share the code to allow participant</h1>
          <div className='AddQ-code-copy'>
            {/* <p>{codeOfElection}</p> */}
            <div className='AddQ-copy1'>
              873645823642734576
            </div>
            <div className='AddQ-copy2'>
              <img
                src={clipsvg}
                alt='copy code'
                onClick={copyToClipboard}
              ></img>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default AddQuestion;
