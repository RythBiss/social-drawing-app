import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { getPosts } from '../Functions/API';
import { motion } from "framer-motion"
import { mapPosts } from '../Functions/Common';


export default function Home(props) {

  const [posts, setPosts] = useState(null);
  const nav = useNavigate();
  const params = {
    user: auth?.currentUser?.displayName,
    uid: auth?.currentUser?.uid,
    photo: auth?.currentUser?.photoURL
  }
  const [after, setAfter] = useState(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [afterUsed, setAfterUsed] = useState(false);

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
    //prevents unnecessary calls if user is at the end
    if(posts && (after !== posts[posts.length - 1].date_time)) {
      setAfter(posts[posts.length - 1].date_time);
      setAfterUsed(false);
    }
  }, [posts])

  useEffect(() => {
    if((scrollPos >= 0.95) && afterUsed === false) {
      const appendPosts = (newPosts) => {
        setPosts([...posts, ...newPosts])
      }
      getPosts(appendPosts, after)
      setAfterUsed(true);
    }
  }, [scrollPos])

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) - window.innerHeight;
      let percent = window.pageYOffset/limit;
      setScrollPos(percent);
    }

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [])

  const postsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const buttonsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.25
      }
    }
  };
  
  const buttonAnim = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  return (
    <div className='feed' >
      {(props.init && posts) &&
        <div className='posts-container'>
          <motion.div className='home-buttons' variants={buttonsContainer} initial="hidden" animate="show">
            <motion.button onClick={toDraw} variants={buttonAnim}>Create Drawing</motion.button>
            <motion.button onClick={toProfile} variants={buttonAnim}>Profile</motion.button>
            <motion.button onClick={toFollowing} variants={buttonAnim}>Following</motion.button>
          </motion.div>
          <motion.div variants={postsContainer} initial="hidden" animate="show">
            {mapPosts(posts)}
          </motion.div>
        </div>
      }
    </div>
  )
}
