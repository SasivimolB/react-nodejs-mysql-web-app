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
    const oldUsername = currentUser;
    const [password, setPassword] = useState('N0P4S5W0R0');
    const [fname, setFname] = useState(firstname);
    const [lname, setLname] = useState(lastname);
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });

    const [status, setStatus] = useState(null);

    const navigate = useNavigate();
    
    const editInfo = () => {
        console.log(username, password, fname, lname)
        //if(password==null) {setPassword('N0P4S5W0R0');}
        Axios.post("http://localhost:3001/api/user/edit", {
            username: username,
            oldUsername: oldUsername,
            password: password,
            firstname: fname,
            lastname: lname
        }).then((response) => {
            console.log(response)
            if(response.data.status) {
                setStatus("Updated Successfully... Redirecting to Dashboard page");
                setCurrentUser(username);
                setPassword(null)
                setFirstname(fname);
                setLastname(lname);
                setProfilepic(response.data.profilepic);
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }
            else {
                setStatus(response.data.message)
            }
        })
    }

    const savePic = () => {
        const formdata = new FormData(); 
        formdata.append('oldUsername', oldUsername);
        formdata.append('profilepic', userInfo.file);
        Axios.post("http://localhost:3001/api/user/savePic", formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then((response) => {
            if(response.data.status) {
                setStatus("Uploaded profile picture Successfully");
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
            }}/><br/>
            <label>Password:</label><br/>
            <input type="password" name="password" onChange={(event) => {
                setPassword(event.target.value);
            }}/><br/>
            <pre>*Leave password field blank to keep the current password*</pre>
            <label>First name:</label><br/>
            <input type="text" name="firstname" value={fname} onChange={(event) => {
                setFname(event.target.value);
            }}/><br/>
            <label>Last name:</label><br/>
            <input type="text" name="lastname" value={lname} onChange={(event) => {
                setLname(event.target.value);
            }}/><br/><br/>
            <label>Profile picture:</label><br/>
            <input type="file"  onChange={(event => {
                setuserInfo({
                    ...userInfo,
                    file:event.target.files[0],
                    filepreview:URL.createObjectURL(event.target.files[0]),
                });
            })}/><button onClick={savePic}>Upload</button><br/>
            <br/>
            <button onClick={editInfo}>Save</button><br/>
        </div>
    )
}
