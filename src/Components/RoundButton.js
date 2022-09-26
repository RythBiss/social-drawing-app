import React from 'react'

export default function RoundButton(props) {
  return (
    <button className='round-button' onClick={props.onClick} >
        <img className='profile-pic' src={props.img} alt='img'/>
    </button>
  )
}
