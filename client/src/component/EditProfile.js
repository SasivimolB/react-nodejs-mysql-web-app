import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function EditProfile() {

    const {
        currentUser, setCurrentUser,
        firstname, setFirstname,
        lastname, setLastname,
        setProfilepic
    } = useAuth();
    
    const [username, setUsername] = useState(currentUser);
    const [password, setPassword] = useState('N0P4S5W0R0');
    const [fname, setFname] = useState(firstname);
    const [lname, setLname] = useState(lastname);
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });

    const [status, setStatus] = useState(null);

    const navigate = useNavigate();

    const edituname = () => {
        Axios.post("http://localhost:3001/api/user/edit-username", {
            username: username,
            oldUsername: currentUser
        }).then((response) => {
            if(response.data.status) {
                setStatus("Updated username");
                setCurrentUser(username);                
            }
            else {
                setStatus(response.data.message)
            }
        })
    }
    const editpw = () => {
        Axios.post("http://localhost:3001/api/user/edit-password", {
            username: username,
            password: password
        }).then((response) => {
            if(response.data.status) {
                setStatus("Updated password");   
            }
            else {
                setStatus(response.data.message)
            }
        })
    }
    const editfname = () => {
        Axios.post("http://localhost:3001/api/user/edit-firstname", {
            username: username,
            firstname: fname
        }).then((response) => {
            if(response.data.status) {
                setStatus("Updated first name");
                setFirstname(fname);                
            }
            else {
                setStatus(response.data.message)
            }
        })
    }
    const editlname = () => {
        Axios.post("http://localhost:3001/api/user/edit-username", {
            username: username,
            lastname: lname
        }).then((response) => {
            if(response.data.status) {
                setStatus("Updated last name");
                setLastname(lname);                
            }
            else {
                setStatus(response.data.message)
            }
        })
    }

    const savePic = () => {
        const formdata = new FormData(); 
        formdata.append('username', username);
        formdata.append('profilepic', userInfo.file);
        Axios.post("http://localhost:3001/api/user/savePic", formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then((response) => {
            if(response.data.status) {
                setProfilepic(response.data.filename)
                setStatus("Uploaded profile picture");
            }
            else {
                setStatus("Failed to upload profile picture")
            }
        })
    }

    return (
        <div>
            <h1>Edit Profile</h1>
            <h3>{status}</h3>

            <label>Username:</label><br/>
            <input type="text" name="username" value={username} onChange={(event) => { 
                setUsername(event.target.value)
            }}/>
            <button onClick={edituname}>Update</button><br/>

            <label>Password:</label><br/>
            <input type="password" name="password" onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            <button onClick={editpw}>Update</button><br/>

            <label>First name:</label><br/>
            <input type="text" name="firstname" value={fname} onChange={(event) => {
                setFname(event.target.value);
            }}/>
            <button onClick={editfname}>Update</button><br/>

            <label>Last name:</label><br/>
            <input type="text" name="lastname" value={lname} onChange={(event) => {
                setLname(event.target.value);
            }}/>
            <button onClick={editlname}>Update</button><br/><br/>

            <label>Profile picture:</label><br/>
            <input type="file"  onChange={(event => {
                setuserInfo({
                    ...userInfo,
                    file:event.target.files[0],
                    filepreview:URL.createObjectURL(event.target.files[0]),
                });
            })}/><button onClick={savePic}>Upload</button><br/>
            <br/>
            <button onClick={() => {
                setStatus("Redirecting to Dashboard page...");
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }}>Done</button><br/>
        </div>
    )
}
