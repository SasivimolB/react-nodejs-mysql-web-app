import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [status, setStatus] = useState();
 
    const login = () => {
        //console.log(username);
        Axios.post("http://localhost:3001/api/user/login", {
            username: username, 
            password: password
        }).then((response) => {
            setStatus("Login successful");
        }).catch((err) => {
            setStatus("Wrong username and/or password");
        });
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
