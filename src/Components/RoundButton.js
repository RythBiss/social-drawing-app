import React, { useEffect } from 'react'

export default function RoundButton(props) {

  useEffect(() => {
    if(props.svg){ console.log('SVG!') }
  }, []);

  return (
    <button className='round-button' onClick={props.onClick} >
        {props.svg ? props.svg : <img className='profile-pic' src={props.img} alt='icon'/>}
    </button>
  )
}