import React, {useState, useContext} from 'react';
import './Createquiz.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../context/LoginContext';


function Createquiz() {
  const {userEmail} = useContext(LoginContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [public1, setPublic] = useState('');
  const navigate = useNavigate();

  // alert(userEmail);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAccessChange = (e) => {
    setPublic(e.target.value);
    // console.log(public1);
  };
  
  async function handleSubmit(e){
    e.preventDefault();
      // console.log('Title:', title);
      // console.log('Description:', description);
      // console.log('Date:', date);
      // console.log('public:', public1);
      if(title && description && date && public1){
          const titleinfo = {title, description, date, public1, userEmail};
          // console.log(titleinfo);
          await axios.post("http://localhost:5000/createquiz", titleinfo)
          .then(res => {
              if(res.data.message === "Title saved successfully"){
                  alert(res.data.message);
                  console.log(res.data.message);
                  navigate('/addq');
              }  
              else{   
                  alert("some error occured please try again");
              }
          })
      }
      else{
          alert("Invalid input");
      }
  };
  
  return (
      <div className="input-form">
      <h1>Input Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title (100 characters max):</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            maxLength={100}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Deadline:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <div>
          <input
            type="radio"
            value={true}
            name='public1'
            onChange={handleAccessChange}
            required
          />Public
          <input
            type="radio"
            value={false}
            name='public1'
            onChange={handleAccessChange}
            required
          />Private
        </div>
        {/* <div>
          <label htmlFor="radio1">Accessibility of election:</label>
          <input
            type="radio"
            id="radio1"
            name="public1"
            value={true}
            onChange={handleAccessChange}
            required
          />Public
          <input
            type="radio"
            id="radio2"
            name="public1"
            value={false}
            onChange={handleAccessChange}
            required
          />Private
        </div> */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Createquiz;