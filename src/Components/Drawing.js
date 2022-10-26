import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DrawingCanvas from './DrawingCanvas';


export default function Drawing(props) {

  const nav = useNavigate();

  const toHome = () => {
    props.setLoading(false)
    nav('/Home');
  }

  return (   
    <div className='drawing-container' >
      <div className='canvas-container'>
        <DrawingCanvas onCompletion={toHome} setLoading={props.setLoading} />
      </div>
    </div>
  )
}