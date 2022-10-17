import React, { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { mapPosts } from '../Functions/Common'
import { getHistory, handleFollow, isFollowingUser } from '../Functions/API';
import { useSearchParams } from 'react-router-dom';
import DefaultProfile from '../Images/Common/DefaultProfile.png'



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
          getHistory(setPosts, searchParams.get('user'));
          setUser(searchParams.get('user'));
          setURL(searchParams.get('photo'));
          setUID(searchParams.get('uid'))
        }
        });
  
      return () => removeAuthListener();
      // eslint-disable-next-line
  }, [searchParams]);

  return (
    <div className='profile-container'>
      <div className='content-container'>
        <div className='profile-block'>
          <div className='image-frame'>
            <img className='profile-image' src={URL !== 'null' ? URL : DefaultProfile /*searchParams returns 'null' instead of a null value for some reason*/} alt='profile' />
          </div>
          <h4>
            {`${user}`}
          </h4>
          {
            user !== auth?.currentUser?.displayName &&
            <button onClick={clickFollow}>{isFollowing ? 'Following' : 'Follow'}</button>
          }
        </div>
        <div className='history'>
          {mapPosts(posts)}
        </div>
      </div>
    </div>
  )
}