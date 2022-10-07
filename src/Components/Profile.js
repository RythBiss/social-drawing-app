import React, { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { mapPosts } from '../Functions/Common'
import { getHistory } from '../Functions/API';


export default function History(props) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(auth.currentUser && posts.length === 0){
      getHistory(setPosts, auth.currentUser.email); //<- make this email change depending on what profile you want to see, i.e. you clicked someone elses profile. Look into query params
     }
  }, [auth.currentUser]);

  return (
    <div className='profile-container'>
      <div className='profile-block'>
        <div className='image-frame'>
          <img className='profile-image' src={props.image} alt='profile image' />
        </div>
      </div>
      <div className='history'>
        {mapPosts(posts)}
      </div>
    </div>
  )
}