import React, { useEffect, useState } from 'react'
import Post from './Post'

import TestingImage from '../Images/TestingImage.png'
import { getRecentPosts } from '../Functions/API';

export default function Home(props) {

  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    getRecentPosts().then(newPosts => {
      setPosts(prevState => prevState.concat(newPosts));
    })
  }

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    //remember, strict mode has been disabled!
    console.log(posts);
  }, [posts]);

  return (
    <div>
        {posts.length === 0 ? (<h3>Loading...</h3>) : (Object.keys(posts).map( current => 
          <Post key={posts[current].id} content={posts[current].url} author={posts[current].title.split(' ')[0]} prompt={posts[current].title.split(' ')[1]} stars={Math.floor(Math.random() * 10)} />
          ))}
    </div>
  )
}
