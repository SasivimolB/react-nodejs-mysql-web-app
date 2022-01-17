import React from 'react'

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

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
            <button>Log in</button>
        </div>
    )
}
