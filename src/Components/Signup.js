import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authorizeUser } from '../Functions/API';

export default function Signup(props) {

    //these will not be stored in plain text, develop a more secure solution when backend is up.
    //firebase handles encryption. Just make the API call with the data and don't save it anywhere.

    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] =useState('');
    const [confirmValue, setConfirmValue] =useState('');

    const nav = useNavigate();

    const toHome = () => {
        nav('/Home');
    }

    const submitCredentials = (event) => {
        event.preventDefault();

        setUserValue('');
        setPassValue('');

        console.log('Submited');

        if(authorizeUser() === true){
            toHome();
        }
    }

    useEffect(() => {
        console.log(`${userValue} / ${passValue} / ${confirmValue}`);
    }, [userValue, passValue, confirmValue]);

    useEffect(() => {
        props.renderHeaders(false);
    }, [])

    return (
        <div className='auth-component'>
            <h1>Sign Up</h1>
            <form onSubmit={submitCredentials} >
                <input type='text' name='username' placeholder='Username' value={userValue} onChange={event => setUserValue(event.target.value)} /><br/>

                <input type='text' name='password' placeholder='Password' value={passValue} onChange={event => setPassValue(event.target.value)} /><br/>

                <input type='text' name='confirm' placeholder='Confirm Password' value={confirmValue} onChange={event => setConfirmValue(event.target.value)} /><br/>

                <button type="submit">Sign In</button>
            </form>
            <Link to='/Signin' >Already have an account?</Link>{/*change to router link*/}
        </div>
    )
}
