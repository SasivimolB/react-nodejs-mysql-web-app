import Axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [status, setStatus] = useState();

    const navigate = useNavigate();

    const {
        setCurrentUser,
        setFirstname,
        setLastname,
        setProfilepic
    } = useAuth();
 
    const login = () => {
        if(username && password)
        {
            Axios.post("http://localhost:3001/api/user/login", {
                username: username, 
                password: password
            }).then((response) => {
                console.log(response)
                if(response.data.status) {
                    setStatus("Login successful... Redirecting to Dashboard page");
                    setCurrentUser(response.data.user);
                    setFirstname(response.data.firstname);
                    setLastname(response.data.lastname);
                    setProfilepic(response.data.profilepic);
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                }
                else {
                    setStatus("Wrong username and/or password")
                }
            })
        }
        else{
            setStatus("Please fill both username and password")
        }
        
    }

    return (
        <div>
            <h1>Login</h1>

            <h2>{status}</h2>

            <label>Username:</label><br/>
            <input type="text" name="username" onChange={(event) => { 
                setUsername(event.target.value); 
            }}/><br/>
            <label>Password:</label><br/>
            <input type="password" name="password"onChange={(event) => {
                setPassword(event.target.value);
            }}/><br/>   
            <br/>
            <button onClick={login}>Log in</button><br/>
            No account? <Link to="/regis">Register</Link>
        </div>
    )
}
