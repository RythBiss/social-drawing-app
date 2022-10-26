import './Styling/CSS/MainStyles.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Header from './Components/Header';
import Landing from './Components/Landing';
import Home from './Components/Home';
import Drawing from './Components/Drawing';
import Following from './Components/Following';
import Profile from './Components/Profile';
import { auth } from './firebase-config';
import Edit from './Components/Edit';
import Loading from './Components/Loading';


/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
https://www.youtube.com/watch?v=tBXSrmwKla0
Security Rules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


function App() {

  //hides or shows header and footer
  const [profilePic, setProfilePic] = useState('');
  const [isInit, setIsInit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const removeAuthListener = auth.onAuthStateChanged((user) => {
      setProfilePic(auth?.currentUser?.photoURL);
      if(user?.auth?._isInitialized){
            setIsInit(true);
          }else{
            setIsInit(false);
          }
        });
  
      return () => removeAuthListener();
      // eslint-disable-next-line
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Header profilePic={profilePic} init={isInit}/>
        {loading && <Loading />}
        <div className='page'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/Signin' element={<Signin setLoading={setLoading} />} />
            <Route path='/Signup' element={<Signup setLoading={setLoading} />} />
            <Route path='/Home' element={<Home init={isInit} />} />
            <Route path='/Draw' element={<Drawing setLoading={setLoading} />} />
            <Route path='/Following' element={<Following setLoading={setLoading} />} />
            <Route path='/Profile' element={<Profile init={isInit} image={profilePic} />} />
            <Route path='/Edit' element={<Edit onImageUpdate={setProfilePic} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
