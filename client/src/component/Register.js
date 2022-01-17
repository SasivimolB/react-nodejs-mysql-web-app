import React, { useState } from 'react'

export default function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [file, setFile] = useState();

    const addUser = () => {
        console.log(username);
    }

    return (
        <div>
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
            <button onClick={addUser}>Sign up</button>
        </div>
    )
}
