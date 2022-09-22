import React from 'react'
import GoldStar from '../Images/GoldStar.svg'
import RoundButton from './RoundButton'

export default function Post(props) {
  return (
    <div className='post'>
        <img className='post-content' src={props.content} alt='post image' />
        <div className='post-info' >
            <div className='author-info'>
                <RoundButton img='https://i.kym-cdn.com/photos/images/facebook/001/896/232/2a0.jpg' />
                <h1>{props.author}<br/>{props.prompt}</h1>
            </div>
            <div className='stars'>
                <img className='star-part' src={GoldStar} alt='star image'/>
                <div className='star-part'>
                    <h1>{props.stars}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}
