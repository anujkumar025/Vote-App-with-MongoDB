import React, {useState} from 'react';
import './Register.css';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [rePass, setRePass] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (p) => {
        setPassword(p.target.value);
    }

    const handleRePassChange = (p) => {
        setRePass(p.target.value);
    }

    const handleNameChange =(p) =>{
        setFname(p.target.value);
    }

    const handleRegister = () =>{
        // console.log("email : ", email, "password : ", password, "name : ", name, "rePass : ", rePass);
        if(fname && email && password && (password === rePass)){
            const user = {fname, email, password};
            axios.post("http://localhost:5000/register", user)
            .then(res => {
                alert(res.data.message);
                navigate('/login');
            }).catch(err => {
                console.log(err);
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
                    <label>Name</label>
                    <input
                        type="text"
                        value={fname}
                        onChange={handleNameChange}
                        className='input'
                    />
                </div>
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
                    <label>Create Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className='input'
                    />
                </div>
                <div className='formGroup'>
                    <label>Re-enter Password</label>
                    <input
                        type="password"
                        value={rePass}
                        onChange={handleRePassChange}
                        className='input'
                    />
                </div>
                <div className='buttonGroup'>
                    <button onClick={handleRegister} className='registerButton'>
                        Register
                    </button>
                    {/* <button onClick={handleLogin} className='loginButton'>
                        <Link to="/login">Login</Link>
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default Register;