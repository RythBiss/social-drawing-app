import React, { useEffect, useState } from 'react'

export default function RoundButtonPopUp(props) {

    const [open, toggle] = useState(false);

    useEffect(() => {
      toggle(props.selected);
    }, [])

  return (
    <select className='list-select'>
        <option value="black">black</option>
        <option value="red">red</option>
        <option value="blue">blue</option>
        <option value="yellow">yellow</option>
    </select>
  )
}
