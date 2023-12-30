import React, { useState } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Createquiz from './Createquiz';
import { LoginContext } from './../context/LoginContext';
import AddQuestion from './Addqueston';
// import Loading from './Loading.js'
import { Findelection } from './find election/Findelection';

function App() {
  const storedUserEmail = localStorage.getItem('userEmail');
  const [userEmail, setUserEmail] = useState(storedUserEmail || 'kotoko');

  const updateUserEmail = (email) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setUserEmail('');
    localStorage.removeItem('userEmail');
  };

  return (
    <Router>
      <div>
        <LoginContext.Provider value={{ userEmail, updateUserEmail, logout }}>
          <Routes>
            <Route path='/' element={[<Header />, <Home />]} />
            <Route path='/login' element={[<Header />, <Login />]} />
            <Route path='/register' element={[<Header />, <Register />]} />
            <Route path='/createquiz' element={[<Header />, <Createquiz />]} />
            <Route path='/addq' element={[<Header />, <AddQuestion />]} />
            <Route path='/findelection' element={[<Header />, <Findelection />]} />
          </Routes>
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;
