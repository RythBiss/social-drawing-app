import React, { useEffect, useState } from 'react'
import { auth } from '../firebase-config';
import { getFollowed, getUserData } from '../Functions/API'
import { mapUsers } from '../Functions/Common';

export default function Following() {

  const [followList, setFollowList] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const removeAuthListener = auth.onAuthStateChanged(() => {
      if(followList.length === 0) {
        getFollowed()
        .then(res => {
          console.log(res.docs[0].data().followed)
          
          let arr = []

          res.docs[0].data().followed.forEach(async(uid) => {
            await getUserData(uid).then(res => arr.push(res));
          });

          setFollowList(arr)
        });
      }
    });
  
    return () => removeAuthListener();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('followList', followList);
  }, [followList]);

  return (
    <div>
      <h1>Following</h1>
      {mapUsers(followList)}
    </div>
  )
}