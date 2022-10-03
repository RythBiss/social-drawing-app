import React, { useEffect, useState } from 'react';
import RoundButton from './RoundButton';
import MenuIcon from '../Images/Common/MenuIcon.svg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  }

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

  const logOut = async() => {
    try{
        await signOut(auth).then(nav('/'));
    }catch(e){
        console.log(e.message);
    }
}

  useEffect(() => {
    console.log(`open menu: ${openMenu}`);
  }, [openMenu]);

  return (
    <header className='page-cap' >
      <RoundButton img={props.profilePic} />
      <h1>Pen Post</h1>
      {openMenu && 
        <ul className='main-menu'>
          <li onClick={toHome}>Home</li>
          <li onClick={toDraw}>Draw</li>
          <li onClick={toFollowing}>Following</li>
          <li onClick={toHistory}>History</li>
          <li className='li-last' onClick={logOut}>Sign Out</li>
        </ul>
      }
      <RoundButton img={MenuIcon} onClick={toggleMenu} />
    </header>
  )
}
