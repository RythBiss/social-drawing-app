import React, { useEffect, useState } from 'react'
import RoundButton from './RoundButton';
import penSmall from '../Images/Pen Size/PenSmall.svg'
import penMedium from '../Images/Pen Size/PenMed.svg'
import penLarge from '../Images/Pen Size/PenLarge.svg'
import ColorPallet from './ColorPallet';

export default function PenSettings(props) {

  const [menu, setMenu] = useState(<></>);

  const selectColor = (color) => {
    props.colorResultFunc(color);
  }

  const selectPenRadius = (radius) => {
    props.penWidthFunc(radius);
  }

  useEffect(() => {
    switch(props.type){
      case 'Pen':
        setMenu(
          <div className='pen-size' >
            <RoundButton img={penSmall} onClick={() => {selectPenRadius(3)}} />
            <RoundButton img={penMedium} onClick={() => {selectPenRadius(9)}} />
            <RoundButton img={penLarge} onClick={() => {selectPenRadius(18)}} />
          </div>
          )
          break;
      case 'Color':
        setMenu(
          <div className='pen-color' >
            <ColorPallet onChangeColor={selectColor} />
          </div>
        )
        break;
      default:
        setMenu(<></>)
    }
    // eslint-disable-next-line
  }, [props.type])

  return (
    <>
      { props.open &&
        <>
          {menu}
        </>
      }
    </>
  )
}
