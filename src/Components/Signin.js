import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

export default function Signin(props) {

    //these will not be stored in plain text, develop a more secure solution when backend is up.
    //firebase handles encryption. Just make the API call with the data and don't save it anywhere.

    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] =useState('');

    const nav = useNavigate();

    const toHome = () => {
        setUserValue('');
        setPassValue('');

        nav('/Home');
    }

    const logout = async() => {
        try{
            await signOut(auth);
        }catch(e){
            console.log(e.message)
        }
    }

    const submitCredentials = async(event) => {
        event.preventDefault();

        console.log('Submited');

        try{
            const newUser = await signInWithEmailAndPassword(auth, userValue, passValue);
            console.log(newUser);
            toHome();
        }catch(e){
            console.log(e.message);
        }


    }

    useEffect(() => {
        console.log()
    });

    useEffect(() => {
        props.renderHeaders(false);
    }, [])

    return (
        <div className='auth-component'>
            <h1>Sign In</h1>
            <form onSubmit={submitCredentials} >
                <input type='text' name='username' placeholder='Username' value={userValue} onChange={event => setUserValue(event.target.value)} /><br/>

                <input type='text' name='password' placeholder='Password' value={passValue} onChange={event => setPassValue(event.target.value)} /><br/>

                <button type="submit" onClick={submitCredentials}>Sign In</button>
            </form>
            <Link to='/Signup' >Need an account?</Link>
            <button onClick={logout}>logout</button>
        </div>
    )
}