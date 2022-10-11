import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { handleUpdateProfile } from '../Functions/API';

export default function Signup() {

    const [nameValue, setNameValue] = useState('');
    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] =useState('');
    const [confirmValue, setConfirmValue] = useState('');

    const nav = useNavigate();

    const toHome = () => {
        setNameValue('');
        setUserValue('');
        setPassValue('');
        setConfirmValue('');

        nav('/Home');
    }

    const submitCredentials = async(event) => {
        event.preventDefault();
        try{
            if(passValue === confirmValue) {
                await createUserWithEmailAndPassword(auth, userValue, passValue)
                .then(() => {
                    handleUpdateProfile(nameValue, null);
                    toHome();
                })
            }else{
                console.log('Password does not match Confirm Password.');
            }
        }catch(e){
            console.log(e.message);
        }

        setUserValue('');
        setPassValue('');
        setConfirmValue('');
    }

    return (
        <div className='auth-component'>
            <h1>Sign Up</h1>
            <form onSubmit={submitCredentials} >
                <input type='text' name='displayname' placeholder='Username' value={nameValue} onChange={event => setNameValue(event.target.value)} /><br/>

                <input type='text' name='email' placeholder='Email' value={userValue} onChange={event => setUserValue(event.target.value)} /><br/>

                <input type='password' name='password' placeholder='Password' value={passValue} onChange={event => setPassValue(event.target.value)} /><br/>

                <input type='password' name='confirm' placeholder='Confirm Password' value={confirmValue} onChange={event => setConfirmValue(event.target.value)} /><br/>

                <button type="submit">Sign Up</button>
            </form>
            <Link to='/Signin' >Already have an account?</Link>
        </div>
    )
}
