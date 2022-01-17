import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const login = () => {
        console.log(username);
        Axios.post("http://localhost:3001/login", {
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
            <input type="password" name="password"onChange={(event) => {
                setPassword(event.target.value);
            }}/><br/>   
            <br/>
            <button onClick={login}>Log in</button><br/>
            No account? <Link to="/regis">Register</Link>
        </div>
    )
}
