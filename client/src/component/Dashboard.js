import '../App.css';
import React from 'react'
import { useNavigate  } from 'react-router-dom';
import { useAuth } from './AuthContext'

export default function Dashboard() {
    let navigate = useNavigate();
    const {
        currentUser, setCurrentUser,
        firstname,
        lastname,
        profilepic,
        filepath
    } = useAuth();
    var pic = filepath + profilepic;
    console.log(pic)
    return (
        <div>
            <img src={filepath + profilepic}/>
            <h3>Username: {currentUser}</h3>
            <h3>Firstname: {firstname}</h3>
            <h3>Lastname: {lastname}</h3>
            <button onClick={() => {
                navigate('/edit');
            }}>Edit Profile</button>&nbsp;
            <button onClick={() => {
                setCurrentUser(null)
                navigate('/login');
            }}>Log out</button>
        </div>
    )
}
