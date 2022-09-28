import React, { useEffect } from 'react';
import DrawingCanvas from './DrawingCanvas';


export default function Drawing(props) {

    useEffect(() => {
      props.renderHeaders(true);
    }, []);

  return (
        <div className='canvas-container'>
          <DrawingCanvas />
        </div>
  )
}