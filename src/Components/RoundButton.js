import React from 'react'
import DefaultProfile from '../Images/Common/DefaultProfile.png'
import { motion } from "framer-motion"

export default function RoundButton(props) {

  return (
    <motion.button className={`round-button ${props.color} ${props.toggled === true ? 'toggled' : ''}`} onClick={props.onClick} variants={props.variants} >
      {
        props.svg ? props.svg : <img className={`profile-pic`} src={props.img ? props.img : DefaultProfile} alt='Profile'/>
      }
    </motion.button>
  )
}