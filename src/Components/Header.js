import React, { useEffect, useState } from 'react';
import RoundButton from './RoundButton';
import MenuIcon from '../Images/Common/MenuIcon.svg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {

  const [renderHeader, setRenderHeader] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const nav = useNavigate();
  const params = {
    user: auth?.currentUser?.displayName,
    uid: auth?.currentUser?.uid,
    photo: auth?.currentUser?.photoURL
  }
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

  const toProfile = () => {
    nav({
      pathname: '/Profile',
      search: `?${createSearchParams(params)}`
    });
    toggleMenu();
  }

  const logOut = async() => {
    signOut(auth).then(() => {
      nav('/');
      toggleMenu();
    }).catch((error) => {
      console.log(error)
    });
  }

useEffect(() => {
  const removeAuthListener = auth.onAuthStateChanged((user) => {
    if(user?.auth?._isInitialized){
          setRenderHeader(true);
        }else{
          setRenderHeader(false);
          nav('/');
        }
      });

    return () => removeAuthListener();
    // eslint-disable-next-line
}, []);

  return (
    <>
      {renderHeader &&
        <header className='page-cap'>
          <RoundButton img={auth?.currentUser?.photoURL} onClick={() => {nav('/Edit')}} />
          <h1>Pen Pals</h1>
          <AnimatePresence>
          {openMenu &&
            <motion.ul
              initial={{x: '100%'}}
              animate={{x: '-0%'}}
              exit={{x: '100%'}}
              transition={{ duration: 0.25, type: "tween" }}
              className='main-menu'>
                <li onClick={toHome}>Home</li>
                <li onClick={toDraw}>Draw</li>
                <li onClick={toProfile}>Profile</li>
                <li onClick={toFollowing}>Following</li>
                <li className='li-last' onClick={logOut}>Sign Out</li>
            </motion.ul>
          }
          </AnimatePresence>
          <RoundButton img={MenuIcon} onClick={toggleMenu}  color='white' />
        </header>
      }
    </>
  )
}