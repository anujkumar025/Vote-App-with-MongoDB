import React, { useState, useContext } from 'react';
import './Addquestion.css';
import axios from 'axios';
import { LoginContext } from '../context/LoginContext';



function AddQuestion() {
  const {userEmail} = useContext(LoginContext);
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctOption: 0, userEmail: userEmail }
  ]);
  const [questionIndex, setQuestionIndex] = useState(0);

  // const [title, setTitle] = useState('');

  // const handleTitleChange = (e) => {
  //   setTitle(e);
  //   // console.log(title);
  // }

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
    console.log(allQuesArray);
    axios.post("http://localhost:5000/addq", allQuesArray)
    .then(res => {
      if(res.data.message === "Question saved successfully"){
        alert(res.data.message);}
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
    <div className="quiz-input">
      {/* <div className="question-container">
        <input
          type="text"
          placeholder={'TITLE'}
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>   */}
      <h1>Quiz Question Input</h1>
      {questions.map((q, questionIndex) => (
        <div key={questionIndex} className="question-container">
          <input
            type="text"
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
          <div className="button-group">
            <button onClick={() => handleDeleteQuestion(questionIndex)}>Delete</button>
            {/* <button onClick={() => handleSaveQuestion(questionIndex)}>Save</button> */}
          </div>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddQuestion;
