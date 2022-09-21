import './Styling/CSS/MainStyles.css';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='page'>
          <Routes>
          {/* change to /Signin */}
            <Route path='/' element={<Signin />} />
            <Route path='/Signup' element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
