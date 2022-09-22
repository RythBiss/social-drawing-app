import React from 'react'
import RoundButton from './RoundButton'

export default function Header(props) {
  return (
    <header className='page-cap' >
      <RoundButton img={props.profilePic} />
      <h1>Pen Post</h1>
      <RoundButton />
    </header>
  )
}
