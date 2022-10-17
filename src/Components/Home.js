import React, { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { getPosts } from '../Functions/API';
import { mapPosts } from '../Functions/Common';


export default function Home() {

  const [posts, setPosts] = useState([]);
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

  return (
    <div className='feed'>
      <div className='posts-container'>
        <div className='home-buttons'>
          <button className='home-nav' onClick={toDraw}>Create Drawing</button>
          <button className='home-nav' onClick={toProfile}>Profile</button>
          <button className='home-nav' onClick={toFollowing}>Following</button>
        </div>
        {mapPosts(posts)}
      </div>
    </div>
  )
}
