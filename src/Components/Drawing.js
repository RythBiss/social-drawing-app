import { useNavigate } from 'react-router-dom';
import DrawingCanvas from './DrawingCanvas';


export default function Drawing() {

  const nav = useNavigate();

  const toHome = () => {
    nav('/Home');
  }

  return (   
    <div className='drawing-container' >
      <div className='canvas-container'>
        <DrawingCanvas onCompletion={toHome} />
      </div>
    </div>
  )
}