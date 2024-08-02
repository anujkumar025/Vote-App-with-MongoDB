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
        <div className='design-container'>
            <div className='content-box'>        
                <h2>Login</h2>
                <div className='Login-box'>
                    <div className='Login-container'>
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
                            <button onClick={handleRegisterButton}  className='Login-registerButton'>Register</button>
                        </div>
                    </div>
                    <div>/</div>
                    <div className='Login-container'>
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
                    </div>
                </div>            
                <h2>Not Registered? Click Here</h2>
            </div>
            <div className='design-div'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,160C672,128,768,64,864,69.3C960,75,1056,149,1152,154.7C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>
        </div>
    );
}

export default Login;