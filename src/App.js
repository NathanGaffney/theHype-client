import React, { useState, useEffect } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth'
import GameIndex from './games/GameIndex';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

document.title = 'The Hype-Train'

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <GameIndex clickLogout={clearToken} token={sessionToken} /> : <Auth updateToken={updateToken} />)
  }

  return (
    <div>
      {protectedViews()}
      
    </div>

  );
}

export default App;
