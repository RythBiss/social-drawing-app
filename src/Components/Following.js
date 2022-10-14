import React, { useEffect } from 'react'
import { getFollowed } from '../Functions/API'

export default function Following(props) {

  useEffect(() => {
    getFollowed().then(res => console.log(res.docs[0].data()))
  })

  return (
    <div>
      <h1>Following</h1>
    </div>
  )
}