import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
    const [regisStatus, setRegisStatus] = useState(null);
    const navigate = useNavigate();

    const addUser = () => {
        if(username && password && firstname && lastname){
            Axios.post("http://localhost:3001/api/user/register", {
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname
            }).then((response) => {
                console.log(response.data)
                if(response.data.status) {
                    setRegisStatus("Registered Successfully... Redirecting to Login page");
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000);
                }
                else {
                    setRegisStatus(response.data.message)
                }
            })
        }
        else {
            setRegisStatus("Please fill all fields")
        }
    }

    const savePic = () => {
        const formdata = new FormData(); 
        formdata.append('username', username);
        formdata.append('profilepic', userInfo.file);
        Axios.post("http://localhost:3001/api/user/savePic", formdata, {
            headers: { "Content-Type": "multipart/form-data, boundary=${form._boundary}" }
        }).then((response) => {
            if(response.data.status) {
                setRegisStatus("Uploaded profile picture Successfully");
            }
            else {
                setRegisStatus("Failed to upload profile picture")
            }
        })
    }

    return (
        <div>
            <h1>Register</h1>
            <h3>{regisStatus}</h3>
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
            }}/><br/><br/>
            <label>Profile picture:</label><br/>
            <input type="file" onChange={(event => {
                setuserInfo({
                    ...userInfo,
                    file:event.target.files[0],
                    filepreview:URL.createObjectURL(event.target.files[0]),
                });
            })}/><button onClick={savePic}>Upload</button><br/>
            <br/>
            <button onClick={addUser}>Register</button><br/>
            Already have an account? <Link to="/">Log in</Link>
        </div>
    )
}
