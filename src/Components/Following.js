import React, { useEffect, useState } from 'react'
import { auth } from '../firebase-config';
import { getFollowed, getUserData } from '../Functions/API'
import { mapUsers } from '../Functions/Common';

export default function Following() {

  const [followList, setFollowList] = useState([]);

  useEffect(() => {
    const removeAuthListener = auth.onAuthStateChanged(() => {
      if(followList.length === 0) {
        getFollowed()
        .then(res => {
          res.docs[0].data().followed.forEach(uid => {
            getUserData(uid).then(res => setFollowList(followList.concat(res)));
          });
        });
      }
    });
  
    return () => removeAuthListener();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('followList', followList);
  }, [followList])

  return (
    <div>
      <h1>Following</h1>
      {mapUsers(followList)}
      
    </div>
  )
}