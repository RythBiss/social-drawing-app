import React from 'react'
import Post from './Post'

import TestingImage from '../Images/TestingImage.png'

export default function Home(props) {

  props.renderHeaders(true);

  return (
    <div>
        <Post content={TestingImage} author={'Ryth'} prompt={'Happy'} stars={8} />
        <Post content={TestingImage} author={'Ryth'} prompt={'Happy'} stars={8} />
        <Post content={TestingImage} author={'Ryth'} prompt={'Happy'} stars={8} />
        <Post content={TestingImage} author={'Ryth'} prompt={'Happy'} stars={8} />
        <Post content={TestingImage} author={'Ryth'} prompt={'Happy'} stars={8} />
    </div>
  )
}
