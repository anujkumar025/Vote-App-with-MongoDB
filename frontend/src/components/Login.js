import React, {useState, useContext} from 'react';
import './Login.css';
import { LoginContext } from '../context/LoginContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import BackendAddress from './../helper/Helper.js';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const Login = () => {
    const {updateUserEmail} = useContext(LoginContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [credential, setCredential] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (p) => {
        setPassword(p.target.value);
    }

    async function handleLoginGoogle(f){
        // console.log(f);
        await axios.post(BackendAddress + 'loggoogle', {credential : f.credential})
        .then(res => {
            if(res.data.message === "User not found"){
                alert("User not registered!");}  
            else{   
                // setEmail(res.data.useremail);
                updateUserEmail(res.data.useremail);
                console.log(res.data.useremail);
                navigate('/');
            }   
        })

    }

    async function handleLogin(e){
        e.preventDefault();
        // console.log("email : ", email, "password : ", password);
        if(email && password){
            const user = {email, password};
            await axios.post(BackendAddress + "login", user)
            .then(res => {
                // console.log(res.data.message);
                if(res.data.message === "User not found"){
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

    const handleRegisterButton = () => {
        navigate('/register');
    }

    return(
        <div className='Login-box'>
            <div className='Login-container'>
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
                <div className='Login-buttonGroup'>
                    <button onClick={handleLogin} className='Login-loginButton'>
                        Login
                    </button>
                    <GoogleOAuthProvider clientId="1056023165218-vagkmigqi77v98gob6eg7qtr7g7ihep0.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                handleLoginGoogle(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            />
                    </GoogleOAuthProvider>

                    <button onClick={handleRegisterButton}  className='Login-registerButton'>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Login;