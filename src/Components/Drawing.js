import { useNavigate } from 'react-router-dom';
import DrawingCanvas from './DrawingCanvas';


export default function Drawing(props) {

  const nav = useNavigate();

  const toHome = () => {
    nav('/Home');
  }

  return (   
      <div className='canvas-container'>
        <h1>Drawing</h1>
        <DrawingCanvas onCompletion={toHome} />
      </div>
  )
}