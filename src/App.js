import './Styling/CSS/MainStyles.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Header from './Components/Header';
import Landing from './Components/Landing';
import Home from './Components/Home';
import Drawing from './Components/Drawing';
import Following from './Components/Following';
import History from './Components/History';

function App() {

  //hides or shows header and footer
  const  [authorized, setAuthorized] = useState(true);

  const [profilePic, setProfilePic] = useState('https://i.kym-cdn.com/photos/images/facebook/001/896/232/2a0.jpg');

  return (
    <Router>
      <div className="App">
        {authorized && <Header profilePic={profilePic} />}
        <div className='page'>
          <Routes>
            <Route path='/' element={<Landing renderHeaders={setAuthorized} />} />
            <Route path='/Signin' element={<Signin renderHeaders={setAuthorized} />} />
            <Route path='/Signup' element={<Signup renderHeaders={setAuthorized} />} />
            <Route path='/Home' element={<Home renderHeaders={setAuthorized} />} />
            <Route path='/Draw' element={<Drawing renderHeaders={setAuthorized} />} />
            <Route path='/Following' element={<Following renderHeaders={setAuthorized} />} />
            <Route path='/History' element={<History renderHeaders={setAuthorized} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
