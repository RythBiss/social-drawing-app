import React, { useEffect, useRef } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';

export default function Drawing(props) {

    const drawing = useRef(null);

    useEffect(() => {
        props.renderHeaders(true);
    }, [])

    const styles = {
        boxShadow: '0 0 4px rgb(0, 0, 0, 0.25)'
      };

  return (
    <div className='drawing-container'>
        {/* https://www.npmjs.com/package/react-sketch-canvas */}
        <ReactSketchCanvas ref={drawing} className='drawing' style={styles} strokeWidth={4} strokeColor="red" />
        {/* <div className='drawing-tools' ></div> */}
    </div>
  )
}