import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });
    const [regisStatus, setRegisStatus] = useState();

    const addUser = () => {
        const formdata = new FormData(); 
        formdata.append('username', username);
        formdata.append('password', password);
        formdata.append('firstname', firstname);
        formdata.append('lastname', lastname);
        formdata.append('profilepic', userInfo.file);
        Axios.post("http://localhost:3001/regis", formdata, {
            headers: { "Content-Type": "multipart/form-data, boundary=${form._boundary}" }
        }).then((response) => {
            setRegisStatus(response.data.message);
        });
    }

    return (
        <div>
            <h1>Register</h1>
            <h3>{regisStatus}</h3>
            <label>Username:</label><br/>
            <input type="text" name="username" required onChange={(event) => { 
                setUsername(event.target.value); 
            }}/><br/>
            <label>Password:</label><br/>
            <input type="password" name="password" required onChange={(event) => {
                setPassword(event.target.value);
            }}/><br/>
            <label>First name:</label><br/>
            <input type="text" name="firstname" required onChange={(event) => {
                setFirstname(event.target.value);
            }}/><br/>
            <label>Last name:</label><br/>
            <input type="text" name="lastname" required onChange={(event) => {
                setLastname(event.target.value);
            }}/><br/><br/>
            <label>Profile picture:</label><br/>
            <input type="file" required onChange={(event => {
                setuserInfo({
                    ...userInfo,
                    file:event.target.files[0],
                    filepreview:URL.createObjectURL(event.target.files[0]),
                });
            })}/><br/>
            <br/>
            <button onClick={addUser}>Register</button><br/>
            Already have an account? <Link to="/login">Log in</Link>
        </div>
    )
}
