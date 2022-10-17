import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';
import RoundButton from './RoundButton'

export default function FollowingCard(props) {

    const params = {
      user: props.user,
      uid: props.uid,
      photo: props.user_photo
    }
    const nav = useNavigate();

    const handleProfileClick = () => {
      nav({
          pathname: '/Profile',
          search: `?${createSearchParams(params)}`
          });
      }

  return (
    <div className='follow-card' onClick={handleProfileClick}>
        <RoundButton img={props.user_photo} />
        <h2>{props.user}</h2>
    </div>
  )
}