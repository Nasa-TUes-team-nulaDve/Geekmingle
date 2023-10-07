import React, { useEffect } from 'react';

import { useUser } from '../Contexts/userContext';
import { jwtRequest } from '../utils/JWTRequest';
function Home() {

  const { setUser, logout } = useUser();
  useEffect(() => {
    const getUserData = async () => {
      const userData = await jwtRequest('GET', '/auth/me', null, logout);
      setUser(userData);
    }
    // Check if the user has a token in local storage
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      // Redirect to the login page if no token is found
      window.location.href = '/login';
    }
    getUserData();
  }, [setUser, logout]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default Home;
