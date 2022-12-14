import React, { useEffect, useState } from 'react'
import GoldStar from '../Images/Common/GoldStar.png'
import BlankStar from '../Images/Common/StarOutline.png'
import RoundButton from './RoundButton'
import { auth, database } from '../firebase-config'
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { getUserData } from '../Functions/API'

export default function Post(props) {

    const [stars, setStars] = useState(props.stars);
    const [userStars, setUserStars] = useState(null);
    const params = { user: props.author, uid: props.uid, photo: props.user_photo }
    const nav = useNavigate();
    const [userStarred, setUserStarred] = useState(false);
    const [authorData, setAuthorData] = useState();
    const starList = query(collection(database, 'star_lists'), where('post_id', '==', props.postId), limit(1));

    const getStars = async() => {
        await getDocs(starList).then(res => setStars(res.docs[0].data().post_stars.length))
    }

    const addStar = async(starList) => {
        await updateDoc(starList.ref, {
            post_stars: arrayUnion(auth.currentUser.uid)
        }).then(() => {
            getStars();
        });
    }

    const revokeStar = async(starList) => {
        await updateDoc(starList.ref, {
            post_stars: arrayRemove(auth.currentUser.uid)
        }).then(() => {
            getStars();
        });
    }

    const handleStarClick = async() => {
        await getDoc(userStars)
        .then(res => {
            const findUID = res.data().post_stars.find(element => element === auth.currentUser.uid);
            if(findUID === auth.currentUser.uid){
                revokeStar(res);
            }else{
                addStar(res);
            }
        })       
    }

    const handleProfileClick = () => {
        nav({
            pathname: '/Profile',
            search: `?${createSearchParams(params)}`
          });
    }

    useEffect(() => {
        const checkStarStatus = async() =>{
            await getDoc(userStars)
            .then((res) => {
                const searchUid = res.data().post_stars.find(element => element === auth.currentUser.uid)
                setUserStarred(searchUid === undefined ? false : true);
            });
        };

        if(userStars){
            checkStarStatus();
            getStars();
        }
        // eslint-disable-next-line
    }, [stars, userStars])

    useEffect(() => {
       const getAuthorInfo = async() => {
        await getUserData(props.uid)
        .then(user => { setAuthorData(user) })
       }

       const getUserStars = async() => {
        await getDocs(starList)
        .then((res) => getDoc(doc(database, 'star_lists', `${res.docs[0].id}`)))
        .then((res) => setUserStars(doc(database, 'star_lists', res.id)));
       }

       getAuthorInfo();
       getUserStars();
    }, []);

  return (
    <motion.div className='post' variants={props.variants}>
        <img className='post-content' src={props.content} alt='post'  onClick={handleProfileClick} />
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
    </motion.div>
  )
}
