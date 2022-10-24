import React, { useEffect, useState } from 'react'
import GoldStar from '../Images/Common/GoldStar.png'
import BlankStar from '../Images/Common/StarOutline.png'
import RoundButton from './RoundButton'
import { auth, database } from '../firebase-config'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { getUserData } from '../Functions/API'

export default function Post(props) {

    const [stars, setStars] = useState(props.stars);
    const postRef = doc(database, 'posts', props.postId);
    const params = { user: props.author, uid: props.uid, photo: props.user_photo }
    const nav = useNavigate();
    const [userStarred, setUserStarred] = useState(false);
    const [authorData, setAuthorData] = useState();

    const getStars = async() => {
        const postData = await getDoc(postRef);

        if(postData.data().star_users){
            setStars(postData.data().star_users.length);
        }
    }

    const addStar = async() => {
        await updateDoc(postRef, {
            star_users: arrayUnion(auth.currentUser.uid)
        }).then(() => {
            getStars();
        });
    }

    const revokeStar = async() => {
        await updateDoc(postRef, {
            star_users: arrayRemove(auth.currentUser.uid)
        }).then(() => {
            getStars();
        });
    }

    const handleStarClick = async() => {
        const postData = await getDoc(postRef);
        
        if(postData.data().star_users){
            const searchUid = postData.data().star_users.find(element => element === auth.currentUser.uid);
            if(searchUid === auth.currentUser.uid){
                revokeStar();
            }else{
                addStar();
            }
        }else{
            addStar();
        }
    }

    const handleProfileClick = () => {
        nav({
            pathname: '/Profile',
            search: `?${createSearchParams(params)}`
          });
    }

    useEffect(() => {
        const checkStarStatus = async() =>{
            const postData = await getDoc(postRef);
            const searchUid = postData.data().star_users && postData.data().star_users.find(element => element === auth.currentUser.uid);

            setUserStarred(searchUid === undefined ? false : true);
        };

        checkStarStatus();
        // eslint-disable-next-line
    }, [stars])

    useEffect(() => {
       const getAuthorInfo = async() => {
        await getUserData(props.uid)
        .then(user => {
            setAuthorData(user)
        })
       }

       getAuthorInfo();
    }, []);

  return (
    <motion.div className='post' variants={props.variants}>
        <div className='post-info' >
            <div className='author-info'>
                <RoundButton img={authorData?.photoURL} onClick={handleProfileClick} />
                <h3>{authorData?.displayName}</h3>
            </div>
            <button
            className='stars'
            onClick={handleStarClick}
            >
                <img className='star-part' src={BlankStar} alt='star'/>

                <motion.img className='star-part' src={GoldStar} alt='star'
                    initial={'Off'}
                    animate={userStarred ? 'On' : 'Off'}
                    variants={{On: { opacity: 1, scale: 1 }, Off: { opacity: 0, scale: 0 }}}
                    transition={{ duration: 0.15, ease: "linear" }}
                />
                <div className='star-part'>
                    <h3>{stars}</h3>
                </div>
            </button>
        </div>
        <img className='post-content' src={props.content} alt='post'  onClick={handleProfileClick} />
    </motion.div>
  )
}
