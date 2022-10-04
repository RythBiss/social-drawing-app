import React, { useEffect, useState } from 'react'
import Post from './Post'
import { getPosts } from '../Functions/API';


export default function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  return (
    <div>
        {posts.length === 0 ? (<h3>Loading...</h3>) : (Object.keys(posts).map( current => 
          <Post key={posts[current].id} content={posts[current].image_url} author={posts[current].author_id} prompt={posts[current].prompt} stars={posts[current].stars} />
          ))}
    </div>
  )
}
