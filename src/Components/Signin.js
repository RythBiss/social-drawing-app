import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

export default function Signin() {

    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] =useState('');

    const nav = useNavigate();

    const toHome = () => {
        setUserValue('');
        setPassValue('');

        nav('/Home');
    }

    const submitCredentials = async(event) => {
        event.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, userValue, passValue);
            toHome();
        }catch(e){
            console.log(e.message)
        }
    }

    return (
        <div className='auth-component'>
            <h1>Sign In</h1>
            <form onSubmit={submitCredentials} >
                <input type='text' name='username' placeholder='Username' value={userValue} onChange={event => setUserValue(event.target.value)} /><br/>

                <input type='password' name='password' placeholder='Password' value={passValue} onChange={event => setPassValue(event.target.value)} /><br/>

                <button type="submit" onClick={submitCredentials}>Sign In</button>
            </form>
            <Link to='/Signup' >Need an account?</Link>
        </div>
    )
}