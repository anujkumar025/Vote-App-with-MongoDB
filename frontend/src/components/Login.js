import React, {useState, useContext} from 'react';
import './Login.css';
import { LoginContext } from '../context/LoginContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const {updateUserEmail} = useContext(LoginContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (p) => {
        setPassword(p.target.value);
    }

    async function handleLogin(e){
        e.preventDefault();
        // console.log("email : ", email, "password : ", password);
        if(email && password){
            const user = {email, password};
            await axios.post("http://localhost:5000/login", user)
            .then(res => {
                // console.log(res.data.message);
                if(res.data.message === "0"){
                alert("User not registered!");}  
                else{   
                    updateUserEmail(email);
                    navigate('/');
                }   
            })
        }
        else{
            alert("Invalid input");
        }
    }

    return(
        <div className='box'>
            <div className='container'>
                <h2>Login</h2>
                <div className='formGroup'>
                    <label>Email : </label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="input"
                    />
                </div>
                <div className='formGroup'>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className='input'
                    />
                </div>
                <div className='buttonGroup'>
                    <button onClick={handleLogin} className='loginButton'>
                        Login
                    </button>
                    <button className='registerButton'>
                        <a className='ar' href="/register">Register</a>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;