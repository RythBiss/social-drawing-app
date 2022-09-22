import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home(props) {

    const nav = useNavigate();

    const toSignup = () => {
        nav('/Signup');
    }

    const toSignin = () => {
        nav('/Signin');
    }

    props.renderHeaders(false);

  return (
    <div className='home-container'>
        <h1>Welcome!</h1>
        <div className='home-buttons-container'>
            <button onClick={toSignin} >Sign In</button>
            <button onClick={toSignup} >Sign Up</button>
        </div>
    </div>
    
  )
}
