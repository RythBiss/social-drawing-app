import React, { useEffect, useState } from 'react';
import { auth } from '../firebase-config';
import { mapPosts } from '../Functions/Common'
import { getHistory, handleFollow, isFollowingUser } from '../Functions/API';
import { useSearchParams } from 'react-router-dom';
import DefaultProfile from '../Images/Common/DefaultProfile.png'
import { motion } from "framer-motion"

export default function History(props) {

  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [URL, setURL] = useState(null);
  const [UID, setUID] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const clickFollow = () =>{
    handleFollow(UID)
    .then(res => setIsFollowing(res));
  }

  useEffect(() => {
    getHistory(setPosts, searchParams.get('user'));
    setUser(searchParams.get('user'));
    setURL(searchParams.get('photo'));
    setUID(searchParams.get('uid'));

    if(UID) {
      const getIsFollowing = async() => {
        await isFollowingUser(UID)
        .then(res => setIsFollowing(res))
      }

      getIsFollowing();
    }
  }, [props.init, searchParams]);

  const postsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  return (
    <div className='profile-container'>
        <div className='content-container'>
          <div className='profile-block'>
            <motion.div className='image-frame'
              initial={{scale: 0}}
              animate={{scale: imgLoaded ? 1 : 0}}
            >
              <img onLoad={() => setImgLoaded(true)} className='profile-image' src={URL !== 'null' ? URL : DefaultProfile /*searchParams returns 'null' instead of a null value for some reason*/} alt='profile' />
            </motion.div>
            <h4>
              {user ? `${user}` : '-'}
            </h4>
            {
              (user !== auth?.currentUser?.displayName && props.init) &&
              <button onClick={clickFollow}>{isFollowing ? 'Following' : 'Follow'}</button>
            }
          </div>
          {posts &&
            <motion.div className='history' variants={postsContainer} initial="hidden" animate="show">
              {mapPosts(posts)}
            </motion.div>
            }
        </div>
    </div>
  )
}