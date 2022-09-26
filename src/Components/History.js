import React, { useEffect } from 'react'

export default function History(props) {

    useEffect(() => {
        props.renderHeaders(true);
    }, [])

  return (
    <div>History</div>
  )
}
