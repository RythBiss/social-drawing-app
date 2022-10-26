import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

export default function Signin(props) {

    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] =useState('');
    const [error, setError] = useState(false);

    const nav = useNavigate();

    const toHome = () => {
        setUserValue('');
        setPassValue('');

        nav('/Home');
    }

    const submitCredentials = async(event) => {
        event.preventDefault();
        try{
            props.setLoading(true)
            await signInWithEmailAndPassword(auth, userValue, passValue)
            .then(() => props.setLoading(false));
            toHome(2);
        }catch(e){
            props.setLoading(false)
            setError(true);
        }
    }

    return (
        <div className='auth-component'>
            {error === true &&
                <p>Incorrect email or password, please try again.</p>
            }
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