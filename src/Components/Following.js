import React, { useEffect, useState } from 'react'
import { auth } from '../firebase-config';
import { getFollowed, getUserData } from '../Functions/API'
import { mapUsers } from '../Functions/Common';

export default function Following(props) {

  const [followList, setFollowList] = useState([]);
  const [userDataList, setUserDataList] = useState([]);

  useEffect(() => {
    if(followList.length !== 0){
        followList.forEach(async(uid) => {
          await getUserData(uid)
          .then(res => {
            setUserDataList(prevState => [...prevState, res])
          })
        });
    }
  }, [followList])

  useEffect(() => {
    setUserDataList([]);

    props.setLoading(true);

    const removeAuthListener = auth.onAuthStateChanged(() => {
      if(followList.length === 0) {
        getFollowed()
        .then(res => {
          props.setLoading(false);
          setFollowList(res.docs[0].data().followed)
        });
      }
    });
  
    return () => removeAuthListener();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='following'>
      {mapUsers(userDataList)}
    </div>
  )
}