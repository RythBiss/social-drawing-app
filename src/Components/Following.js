import React, { useEffect } from 'react'

export default function Following(props) {

    useEffect(() => {
        props.renderHeaders(true);
    }, [])
    

  return (
    <div>Following</div>
  )
}
