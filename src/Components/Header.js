import React, { useEffect, useState } from 'react';
import RoundButton from './RoundButton';
import MenuIcon from '../Images/Common/MenuIcon.svg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"

export default function Header(props) {

  const [openMenu, setOpenMenu] = useState(false);
  const nav = useNavigate();
  const params = {
    user: auth?.currentUser?.displayName,
    uid: auth?.currentUser?.uid,
    photo: auth?.currentUser?.photoURL
  }
  const location = useLocation();

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

  const toEdit = () => {
    nav('/Edit');
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
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [location]);
  

  return (
    <>
      {props.init &&
        <motion.header
          className='page-cap'
          initial={{y: '-100%'}}
          animate={{y: '0%'}}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <RoundButton img={props.profilePic} />
          <h1>Pen Pals</h1>
          <AnimatePresence>
          {openMenu &&
            <motion.ul
              initial={{x: '100%'}}
              animate={{x: '-0%'}}
              exit={{x: '100%'}}
              transition={{ duration: 0.15, type: "tween" }}
              className='main-menu'>
                <li onClick={toHome}>Home</li>
                <li onClick={toDraw}>Draw</li>
                <li onClick={toProfile}>Profile</li>
                <li onClick={toFollowing}>Following</li>
                <li onClick={toEdit}>Edit Profile</li>
                <li className='li-last' onClick={logOut}>Sign Out</li>
            </motion.ul>
          }
          </AnimatePresence>
          <RoundButton img={MenuIcon} onClick={toggleMenu}  color='white' />
        </motion.header>
      }
    </>
  )
}