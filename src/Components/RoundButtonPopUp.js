import React, { useEffect, useState } from 'react'
import RoundButton from './RoundButton';

export default function RoundButtonPopUp(props) {

  const [menu, setMenu] = useState(<></>);

  useEffect(() => {
    if(props.type === 'Pen'){
      setMenu(<>
        <RoundButton />
        <RoundButton />
        <RoundButton />
      </>)
    }else{
      setMenu(<>
        <RoundButton />
        <RoundButton />
        <RoundButton />
        <RoundButton />
        <RoundButton />
      </>)
    }
  }, [props.type])

  return (
    <>
      { props.open &&
        <>
          <div className='pen-selector' >
            {menu}
          </div>
        </>
      }
    </>
  )
}
