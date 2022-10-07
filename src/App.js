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
import Profile from './Components/Profile';


/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
https://www.youtube.com/watch?v=tBXSrmwKla0
Security Rules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


function App() {

  //hides or shows header and footer
  const [profilePic, setProfilePic] = useState('https://i.kym-cdn.com/photos/images/facebook/001/896/232/2a0.jpg');
  
  return (
    <Router>
      <div className="App">
        <Header profilePic={profilePic} />
        <div className='page'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/Signin' element={<Signin />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Draw' element={<Drawing />} />
            <Route path='/Following' element={<Following />} />
            <Route path='/Profile' element={<Profile image={profilePic} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
