import React, { useState } from 'react';
import LogIn from './components/LogIn';
import Home from './components/Home';
import './index.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId,setUserId] = useState(null);
  const [username,setUsername] = useState(null);


  const handleLogin = (userId, username) => {
    setLoggedIn(true);
    setUserId(userId);
    setUsername(username);
  };

  return (
    <div className="App">
      <div className="content">
        {loggedIn ? <Home userId={`${userId}`} username={username}/> : <LogIn onLogin={handleLogin} />}
      </div>
    </div>
  );
}

export default App;
