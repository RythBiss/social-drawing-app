import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { createUserDocs, handleUpdateProfile } from '../Functions/API';

export default function Signup(props) {

    const [nameValue, setNameValue] = useState('');
    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] =useState('');
    const [confirmValue, setConfirmValue] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const [emailInvalid, setEmailinvalid] = useState(false);
    const [nameValid, setNameValid] = useState(true);

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
        setEmailExists(false);
        setEmailinvalid(false);

        try{
            if((passValue === confirmValue) && (isNameValid())) {
                props.setLoading(true);
                await createUserWithEmailAndPassword(auth, userValue, passValue)
                .then(() => {
                    props.setLoading(false);
                    handleUpdateProfile(nameValue, null);
                    createUserDocs(auth.currentUser.uid, nameValue);
                    toHome();
                })
            }else{              
                if(confirmValue !== passValue){
                    console.log('passwords =/=')
                }
                if(isNameValid){
                    console.log('name invalid')
                }
            }
        }catch(e){
            props.setLoading(false);
            console.log(e.code)
            if(e.code === 'auth/email-already-in-use'){
                setEmailExists(true);
            }
            
            if(e.code === 'auth/invalid-email'){
                setEmailinvalid(true);
            }
        }
    }

    const isNameValid = () => {
        return (5 <= nameValue.length && nameValue.length <= 15);
    }

    useEffect(() => {
        setNameValid(isNameValid());
        console.log(nameValid)
    }, [nameValue]);

    return (
        <div className='auth-component'>
            {((passValue !== confirmValue) && (confirmValue !== '')) &&
                <p>Passwords do not match, please try again.</p>
            }
            {emailExists === true &&
                <p>An account with that email already exists, please try again.</p>
            }  
            {emailInvalid === true &&
                <p>Email is invalid, please try again.</p>
            }  
            {nameValid === false &&
                <p>Username must be between 5-15 characters.</p>
            }          
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