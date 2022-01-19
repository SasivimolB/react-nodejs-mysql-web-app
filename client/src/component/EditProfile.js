import React, { useState } from 'react'

export default function EditProfile() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });
    
    const editInfo = () => {

    }

    return (
        <div>
            <h1>Edit Profile</h1>
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
            <button onClick={editInfo}>Save</button><br/>
        </div>
    )
}
