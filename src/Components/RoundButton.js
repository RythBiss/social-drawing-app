import React from 'react'

export default function RoundButton(props) {
  return (
    <button className={`round-button ${props.color}`} onClick={props.onClick} >
      <img className='profile-pic' src={props.img} alt='icon'/>
    </button>
  )
}