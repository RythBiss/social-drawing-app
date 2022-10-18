import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { getPosts } from '../Functions/API';
import { motion } from "framer-motion"
import { mapPosts } from '../Functions/Common';


export default function Home() {

  const [posts, setPosts] = useState();
  const nav = useNavigate();
  const params = {
    user: auth?.currentUser?.displayName,
    uid: auth?.currentUser?.uid,
    photo: auth?.currentUser?.photoURL
  }

  const toDraw = () => {
    nav('/Draw');
  }

  const toFollowing = () => {
    nav('/Following');
  }

  const toProfile = () => {
    nav({
      pathname: '/Profile',
      search: `?${createSearchParams(params)}`
    });
  }

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  const [list, setList] = useState(['one', 'two', 'three', 'four']);

  const postsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const buttonsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const buttonContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  return (
    <div className='feed' >
        <div className='posts-container'>
          <motion.div className='home-buttons' variants={buttonsContainer} initial="hidden" animate="show">
            <motion.button className='home-nav' onClick={toDraw} variants={buttonContainer}>Create Drawing</motion.button>
            <motion.button className='home-nav' onClick={toProfile} variants={buttonContainer}>Profile</motion.button>
            <motion.button className='home-nav' onClick={toFollowing} variants={buttonContainer}>Following</motion.button>
          </motion.div>
          {posts &&
          <motion.div variants={postsContainer} initial="hidden" animate="show">
            {mapPosts(posts)}
          </motion.div>
          }
      </div>
    </div>
  )
}
