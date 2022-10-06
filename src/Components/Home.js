import React, { useEffect, useState } from 'react'
import { getPosts } from '../Functions/API';
import { mapPosts } from '../Functions/Common';


export default function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  return (
    <div>
        {mapPosts(posts)}
    </div>
  )
}
