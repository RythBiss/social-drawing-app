import { useNavigate } from 'react-router-dom';
import DrawingCanvas from './DrawingCanvas';


export default function Drawing(props) {

  const nav = useNavigate();

  const toHome = () => {
    nav('/Home');
  }

  return (
        <div className='canvas-container'>
          <DrawingCanvas onCompletion={toHome} />
        </div>
  )
}