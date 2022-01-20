import Axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from './AuthContext';



export default function EditProfile() {

    const {
        currentUser,
        firstname,
        lastname
    } = useAuth();
    
    const [username, setUsername] = useState(currentUser);
    const [oldUsername, setOldUsername] = useState(currentUser);
    const [password, setPassword] = useState();
    const [fname, setFname] = useState(firstname);
    const [lname, setLname] = useState(lastname);
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });
    
    const editInfo = () => {
        // if(oldUsername == username) {setUsername(null)}
        if(!password) {setPassword('N0P4S5W0R0');}
        const formdata = new FormData(); 
        formdata.append('username', username);
        formdata.append('oldUsername', oldUsername);
        formdata.append('password', password);
        formdata.append('firstname', fname);
        formdata.append('lastname', lname);
        Axios.post("http://localhost:3001/api/user/edit", {
            username: username,
            oldUsername: oldUsername,
            password: password,
            firstname: firstname,
            lastname: lastname
        })
        .then((response) => {
            console.log(response)
        });
    }

    const savePic = () => {
        const formdata = new FormData(); 
        formdata.append('oldUsername', oldUsername);
        formdata.append('profilepic', userInfo.file);
        Axios.post("http://localhost:3001/api/user/savePic", formdata, {
            headers: { "Content-Type": "multipart/form-data, boundary=${form._boundary}" }
        }).then((response) => {
            console.log(response)
        })
    }

    return (
        <div>
            <h1>Edit Profile</h1>
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
