import React from 'react'
import { useNavigate } from 'react-router-dom'
import RoundButton from './RoundButton'

export default function Footer() {

  const nav = useNavigate();

  const toHome = () => {
    nav('/Home');
  }

  const toDraw = () => {
    nav('/Draw');
  }
  
  const toFollowing = () => {
    nav('/Following');
  }

  const toHistory = () => {
    nav('/History');
  }

  return (
    <footer className='page-cap' >
        <RoundButton onClick={toHome} />
        <RoundButton onClick={toDraw} />
        <RoundButton onClick={toFollowing} />
        <RoundButton onClick={toHistory} />
    </footer>
  )
}
