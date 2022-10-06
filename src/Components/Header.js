import React, { useEffect, useState } from 'react';
import RoundButton from './RoundButton';
import MenuIcon from '../Images/Common/MenuIcon.svg';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {

  const [renderHeader, setRenderHeader] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const nav = useNavigate();

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  }

  const toHome = () => {
    nav('/Home');
    toggleMenu();
  }

  const toDraw = () => {
    nav('/Draw');
    toggleMenu();
  }

  const toFollowing = () => {
    nav('/Following');
    toggleMenu();
  }

  const toHistory = () => {
    nav('/History');
    toggleMenu();
  }

  const logOut = async() => {
    signOut(auth).then(() => {
      console.log('Done!')
      nav('/');
      toggleMenu();
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    if(auth.currentUser){
      setRenderHeader(true);
     }else{
      setRenderHeader(false);
      nav('/');
     }
    console.log(renderHeader);
  }, [auth.currentUser]);

  return (
    <>
      {renderHeader &&
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
      }
    </>
  )
}