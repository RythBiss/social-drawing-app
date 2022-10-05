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
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase-config';

function App() {

  //hides or shows header and footer
  const  [authorized, setAuthorized] = useState(false);
  const [profilePic, setProfilePic] = useState('https://i.kym-cdn.com/photos/images/facebook/001/896/232/2a0.jpg');

  onAuthStateChanged(auth, (user) => {
    if(user){
      setAuthorized(true);
    }else{
      setAuthorized(false);
    }
  });
  
  return (
    <Router>
      <div className="App">
        <Header profilePic={profilePic} renderHeader={authorized} setAuthorized={setAuthorized} />
        <div className='page'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/Signin' element={<Signin />} setAuthorized={setAuthorized} />
            <Route path='/Signup' element={<Signup />} setAuthorized={setAuthorized} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Draw' element={<Drawing />} />
            <Route path='/Following' element={<Following />} />
            <Route path='/History' element={<History />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
