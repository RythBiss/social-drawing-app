import React, { useEffect, useState } from 'react'
import RoundButton from './RoundButton';
import { CirclePicker } from 'react-color';
import penSmall from '../Images/Pen Size/PenSmall.svg'
import penMedium from '../Images/Pen Size/PenMed.svg'
import penLarge from '../Images/Pen Size/PenLarge.svg'

export default function RoundButtonPopUp(props) {

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
          <div className='pen-selector pen-size' >
            <RoundButton img={penSmall} onClick={() => {selectPenRadius(3)}} />
            <RoundButton img={penMedium} onClick={() => {selectPenRadius(9)}} />
            <RoundButton img={penLarge} onClick={() => {selectPenRadius(18)}} />
          </div>
          )
          break;
      case 'Color':
        setMenu(
          <div className='pen-color' >
            <CirclePicker color={'#607db8'} onChangeComplete={selectColor} colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b", '#CCCCCC', '#999999', '#666666', '#4D4D4D', '#333333', '#000000']}/>
          </div>
        )
        break;
      default:
        setMenu(<></>)
    }
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
