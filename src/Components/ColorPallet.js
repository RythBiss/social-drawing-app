import React, { useEffect, useState } from 'react'
import RoundButton from './RoundButton';

export default function ColorPallet(props) {

    const [colors, setColors] = useState([]);

    const changeColor = (color) => {
        props.onChangeColor(color);
    }

    useEffect(() => {
        setColors(["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#2196f3", "#00bcd4", "#009688", "#8bc34a", "#ffeb3b", "#ff9800", "#ff5722", '#f2d399', "#795548", "#607d8b", '#999999', '#000000'])
    }, []);

  return (
    <>
        {Object.keys(colors).map((swatch, i) => {  

            const svg =
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <circle cx="25" cy="25" r="25" fill={`${colors[swatch]}`}/>
            </svg>

            return <RoundButton key={i} svg={svg} onClick={() => changeColor(colors[swatch])} />
        })}
    </>
  )
}