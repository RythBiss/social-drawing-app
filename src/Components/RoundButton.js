import React from 'react'
import DefaultProfile from '../Images/Common/DefaultProfile.png'

export default function RoundButton(props) {

  return (
    <button className={`round-button ${props.color} ${props.toggled === true ? 'toggled' : ''}`} onClick={props.onClick} >
      {
        props.svg ? props.svg : <img className={`profile-pic`} src={props.img ? props.img : DefaultProfile} alt='Profile'/>
      }
    </button>
  )
}