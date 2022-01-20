import Axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [status, setStatus] = useState();

    const {
        currentUser, setCurrentUser,
        firstname, setFirstname,
        lastname, setLastname,
        profilepic, setProfilepic
    } = useAuth();
 
    const login = () => {
        Axios.post("http://localhost:3001/api/user/login", {
            username: username, 
            password: password
        }).then((response) => {
            setStatus("Login successful");
            //localStorage.setItem("token", response.data.token);
            console.log(response);
            setCurrentUser(response.data.user);
            setFirstname(response.data.firstname);
            setLastname(response.data.lastname);
            setProfilepic(response.data.profilepic);
            console.log(currentUser);
        }).catch((err) => {
            setStatus("Wrong username and/or password");
        });
    }

    return (
        <div>
            <h1>Login</h1>

            <h2>{status}</h2>
            {currentUser && <Navigate to = "/dashboard" />}

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
