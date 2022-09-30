import React, { useEffect, useState } from 'react'
import RoundButton from './RoundButton'
import MenuIcon from '../Images/Common/MenuIcon.svg'

export default function Header(props) {

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  }

  useEffect(() => {
    console.log(`open menu: ${openMenu}`);
  }, [openMenu]);

  return (
    <header className='page-cap' >
      <RoundButton img={props.profilePic} />
      <h1>Pen Post</h1>
      <RoundButton img={MenuIcon} onClick={toggleMenu} />
    </header>
  )
}
