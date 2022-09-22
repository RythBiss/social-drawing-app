import React from 'react'
import TestingImage from '../Images/TestingImage.png'
import GoldStar from '../Images/GoldStar.svg'

export default function Post(props) {
  return (
    <div className='post'>
        <img src={TestingImage} alt='post image' />
        <div className='post-info' >
            <div className='author-info'>
                <button className='round-button' >
                    <img className='profile-pic' src='https://i1.sndcdn.com/avatars-P9AimttHN0dhFha9-R0gNbA-t500x500.jpg' alt='img'/>
                </button>
                <h1>Ryth Biss<br/>Prompt</h1>
            </div>
            <div className='stars'>
                <img className='star-part' src={GoldStar} alt='star image'/>
                <div className='star-part'>
                    <h1>7</h1>
                </div>
            </div>
        </div>
    </div>
  )
}
