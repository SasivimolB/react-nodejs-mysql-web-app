import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    // const [file, setFile] = useState();
    // const [filename, setFilename] = useState();
    var checkUser = true;

    function checkUsername() {
        var re = /^\w+$/;
        if(!(username.match(re)))
        {
            alert('Please use only alphabet characters(A-Z, a-z), numbers(0-9), and underscore(_) for username');
            checkUser = false;
        }
        if(username.length>12) {
            alert('Username must be shorter than 12 characters');
            checkUser = false;
        }
    }

    function checkPassword() { 
        var re = /[a-zA-Z]{2,}|\d{2,}/g;
        if(password.length<6) {
            alert('Password must be longer than 6 characters');
            checkUser = false;
        }
        if(password.match(re)) {
            alert("There shouldn't be any consecutive alphabets or numbers in the password.");
            checkUser = false;
        }
    }

    const addUser = async () => {
        checkPassword();
        checkUsername();
        if(checkUser === true)
        {
            console.log(username);
            const formdata = new FormData(); 
            formdata.append('username', username);
            formdata.append('password', password);
            formdata.append('firstname', firstname);
            formdata.append('lastname', lastname);
            formdata.append('profilepic', userInfo.file);
            Axios.post("http://localhost:3001/regis", formdata, {
                headers: { "Content-Type": "multipart/form-data, boundary=${form._boundary}" }
            }).then((response) => {
                console.log('success');
            });
        }
        
    }

    // const submit = async () =>{
    //     const formdata = new FormData(); 
    //     formdata.append('profilepic', userInfo.file);
    
    //     Axios.post("http://localhost:3001/regis", formdata,{   
    //       headers: { "Content-Type": "multipart/form-data" } 
    //     })
    //     .then(res => { // then print response status
    //       console.warn(res);
    //       if(res.data.success === 1){
    //         console.log("Image upload successfully");
    //       }
    //     })
    // }

    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });

    return (
        <div>
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
            }}/><br/>
            <input type="file" required onChange={(event => {
                // setFilename(event.target.files[0].name)
                // setFile(event.target.files[0])
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
