import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signin() {

    //these will not be stored in plain text, develop a more secure solution when backend is up.
    //firebase handles encryption. Just make the API call with the data and don't save it anywhere.

    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] =useState('');

    const submitCredentials = (event) => {
        event.preventDefault();

        setUserValue('');
        setPassValue('');
    }

    useEffect(() => {
        console.log(`${userValue} / ${passValue}`);
    }, [userValue, passValue]);

    return (
        <div className='auth-component'>
            <h1>Sign In</h1>
            <form onSubmit={submitCredentials} >
                <input type='text' name='username' placeholder='Username' value={userValue} onChange={event => setUserValue(event.target.value)} /><br/>

                <input type='text' name='password' placeholder='Password' value={passValue} onChange={event => setPassValue(event.target.value)} /><br/>

                <button type="submit">Sign In</button>
            </form>
            <Link to='/Signup' >Need an account?</Link>
        </div>
    )
}