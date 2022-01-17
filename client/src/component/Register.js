import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [file, setFile] = useState();

    const addUser = () => {
        console.log(username);
        Axios.post("http://localhost:3001/regis", {
            username: username, 
            password: password
        }).then((response) => {
            console.log('success');
        });
    }

    return (
        <div>
            <label>Username:</label><br/>
            <input type="text" name="username" onChange={(event) => { 
                setUsername(event.target.value); 
            }}/><br/>
            <label>Password:</label><br/>
            <input type="password" name="password" onChange={(event) => {
                setPassword(event.target.value);
            }}/><br/>
            <label>First name:</label><br/>
            <input type="text" name="firstname" onChange={(event) => {
                setFirstname(event.target.value);
            }}/><br/>
            <label>Last name:</label><br/>
            <input type="text" name="lastname" onChange={(event) => {
                setLastname(event.target.value);
            }}/><br/>
            <input type="file" onChange={(event => {
                setFile(event.target.value);
            })}/><br/>
            <br/>
            <button onClick={addUser}>Register</button><br/>
            Already have an account? <Link to="/">Log in</Link>
        </div>
    )
}
