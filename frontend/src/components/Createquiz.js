import React, {useState, useContext} from 'react';
import './Createquiz.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../context/LoginContext';
import BackendAddress from './../helper/Helper.js';



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
      if(title && description && date && public1){
          const titleinfo = {title, description, date, public1, userEmail};
          await axios.post(BackendAddress+"createquiz", titleinfo)
          .then(res => {
              if(res.data.message === "Title saved successfully"){
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
  <div className="Create-main">
    <div className='Create-form-box'>

      <h1>Input Form</h1>
      <form onSubmit={handleSubmit}>
        <div className='Create-formgroup'>
          <label htmlFor="title">Title (150 characters max):</label>
          <input
            type="text"
            className='Create-input'
            id="title"
            value={title}
            onChange={handleTitleChange}
            maxLength={100}
            required
          />
        </div>
        <div className='Create-formgroup'>
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            className='Create-input'
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
            required
          />
        </div>
        <div className='Create-formgroup'>
          <label htmlFor="date">Deadline:</label>
          <input
            type="date"
            className='Create-input'
            id="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <div className='Create-formgroup-radio'>
        <label>Public</label>
          <input
            type="radio"
            value={true}
            name='public1'
            onChange={handleAccessChange}
            required
          />
        </div>
        <div className='Create-formgroup-radio'>
          <label>Private</label>
          <input
            type="radio"
            value={false}
            name='public1'
            onChange={handleAccessChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default Createquiz;