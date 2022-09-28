import React, { useEffect, useState } from 'react';
import DrawingCanvas from './DrawingCanvas';


export default function Drawing(props) {
  
    useEffect(() => {
      props.renderHeaders(true);
    }, []);

  return (
        <div className='canvas-container'>
          {/* <div className='drawing-tools' ></div> */}
          <DrawingCanvas />
        </div>
  )
}