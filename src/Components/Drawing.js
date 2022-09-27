import React, { useEffect, useRef, useState } from 'react';
import CanvasDraw from "react-canvas-draw";
import RoundButton from '../Components/RoundButton'
import Undo from '../Images/Drawing Buttons/Undo.svg'
import Brush from '../Images/Drawing Buttons/Brush.svg'
import Pallet from '../Images/Drawing Buttons/Pallet.svg'
import Erase from '../Images/Drawing Buttons/Erase.svg'


export default function Drawing(props) {

    const canvas = useRef(null);

    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHieght, setScreenHieght] = useState(0);

    const undo = () => {
      canvas.current.undo();
      console.log('undo...')
    }

    const penSize = () => {

    }

    const pickColor = () => {

    }

    const erase = () => {

    }

    const submit = () => {
      const img = canvas.current.getDataURL('image/png', false, '#FFFFFF');

      console.log(img);

      window.open(img)
    }

    useEffect(() => {
      props.renderHeaders(true);
    }, []);

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth * 0.75);
        setScreenHieght(window.innerHeight * 0.75);
      }

      window.addEventListener('resize', handleResize);
    })

    useEffect(() => {
      
    }, [screenWidth, screenHieght])

  return (
      <div className='drawing-container' >
        <div className='canvas-container'>
          {/* <div className='drawing-tools' ></div> */}
          <CanvasDraw ref={canvas} style={{width: '100%', height: '100%'}} />
        </div>
        <div className='button-row'>
          <RoundButton img={Undo} onClick={undo} />
          <RoundButton img={Brush} onClick={penSize} />
          <RoundButton img={Pallet} onClick={pickColor} />
        </div>
        <button onClick={submit}>Submit</button>
      </div>
  )
}