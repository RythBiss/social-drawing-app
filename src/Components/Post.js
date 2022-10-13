import React, { useState } from 'react'
import GoldStar from '../Images/Common/GoldStar.svg'
import RoundButton from './RoundButton'
import { auth, database } from '../firebase-config'
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { createSearchParams, useNavigate } from 'react-router-dom'

export default function Post(props) {

    const [stars, setStars] = useState(props.stars);
    const postRef = doc(database, 'posts', props.postId);
    const params = {
        user: props.author,
        uid: props.uid,
        photo: props.user_photo
    }
    const nav = useNavigate();

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

  return (
    <div className='post'>
        <div className='post-info' >
            <div className='author-info'>
                <RoundButton img={props.user_photo} onClick={handleProfileClick} />
                <h3>{props.author}<br/>{props.prompt}</h3>
            </div>
            <button className='stars' onClick={handleStarClick}>
                <img className='star-part' src={GoldStar} alt='star'/>
                <div className='star-part'>
                    <h3>{stars}</h3>
                </div>
            </button>
        </div>
        <img className='post-content' src={props.content} alt='post' />
    </div>
  )
}
