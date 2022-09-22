import './Styling/CSS/MainStyles.css';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Landing from './Components/Landing';
import Home from './Components/Home';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  //hides or shows header and footer
  const  [authorized, setAuthorized] = useState(true);

  return (
    <Router>
      <div className="App">
        {authorized ? <Header /> : <></>}
        <div className='page'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/Signin' element={<Signin />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Home' element={<Home />} />
          </Routes>
        </div>
        {authorized ? <Footer /> : <></>}
      </div>
    </Router>
  );
}

export default App;
