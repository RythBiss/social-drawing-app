import React, { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { mapPosts } from '../Functions/Common'
import { getHistory } from '../Functions/API';


export default function History() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(auth.currentUser && posts.length === 0){
      getHistory(setPosts);
     }
  }, [auth.currentUser]);

  return (
    <div>{mapPosts(posts)}</div>
  )
}
