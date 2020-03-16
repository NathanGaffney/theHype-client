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
    return (sessionToken === localStorage.getItem('token') ? <Router><GameIndex token={sessionToken} /></Router> : <Auth updateToken={updateToken} />)
  }

  return (
    <div>
      {sessionToken ? <Sitebar clickLogout={clearToken} /> : null}
      {protectedViews()}
    </div>

  );
}

export default App;
