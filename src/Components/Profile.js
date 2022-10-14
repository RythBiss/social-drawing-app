import React, { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { mapPosts } from '../Functions/Common'
import { getHistory, handleFollow, isFollowingUser } from '../Functions/API';
import { useSearchParams } from 'react-router-dom';


export default function History() {

  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [URL, setURL] = useState(null);
  const [UID, setUID] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const clickFollow = () =>{
    handleFollow(UID)
    .then(res => setIsFollowing(res));
  }

  useEffect(() => {
    if(UID) {
      const getIsFollowing = async() => {
        await isFollowingUser(UID)
        .then(res => setIsFollowing(res))
      }

      getIsFollowing();
    }
  }, [UID]);

  useEffect(() => {
    const removeAuthListener = auth.onAuthStateChanged((user) => {
      if(user?.auth?._isInitialized){
        if(posts.length === 0){
          getHistory(setPosts, searchParams.get('user')); //<- make this email change depending on what profile you want to see, i.e. you clicked someone elses profile. Look into query params
        }
          setUser(searchParams.get('user'));
          setURL(searchParams.get('photo') ? searchParams.get('photo') : auth.currentUser.photoURL);
          setUID(searchParams.get('uid'))
        }
        });
  
      return () => removeAuthListener();
      // eslint-disable-next-line
  }, []);

  return (
    <div className='profile-container'>
      <h1>Profile</h1>
      <div className='content-container'>
        <div className='profile-block'>
          <div className='image-frame'>
            <img className='profile-image' src={URL} alt='profile' />
          </div>
          <h4>
            {`${user}`}
          </h4>
          {
            user !== auth?.currentUser?.displayName &&
            <button onClick={clickFollow} >{isFollowing ? 'Following' : 'Follow'}</button>
          }
        </div>
        <div className='history'>
          {mapPosts(posts)}
        </div>
      </div>
    </div>
  )
}