import React from 'react'

export default function RoundButton(props) {
  return (
    <button className={`round-button ${props.color}`} onClick={props.onClick} >
        {props.svg ? props.svg : <img className='profile-pic' src={props.img} alt='icon'/>}
    </button>
  )
}