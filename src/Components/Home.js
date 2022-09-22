import React, { useEffect, useState } from 'react'
import Post from './Post'

import TestingImage from '../Images/TestingImage.png'
import { getRecentPosts } from '../Functions/API';

export default function Home(props) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    props.renderHeaders(true);
    getRecentPosts().then(newPosts => {
      setPosts(prevState => prevState.concat(newPosts));
    })

  }, [])

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div>
        Home
    </div>
  )
}
