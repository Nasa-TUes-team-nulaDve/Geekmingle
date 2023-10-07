import React, { useEffect } from 'react';

import Navbar from '../Components/Navbar.js';

import './Home.css'; // Import the CSS file

import { useUser } from '../Contexts/UserContext';
import { jwtRequest } from '../utils/JWTRequest';
function Home() {

  const { user, setUser, logout } = useUser();



  useEffect(() => {
    const getUserData = async () => {
      const userData = await jwtRequest('auth/me', 'GET', null, logout);

      setUser(userData);

      // setUser({
      //   username: 'Petar',
      //   ownProjectId: null,
      //   associatedProjects: [],
      // })
    }
    // // Check if the user has a token in local storage
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      // Redirect to the login page if no token is found
      setUser({
        username: '',
        ownProjectId: null,
        associatedProjects: [],
      })
    } else {
      getUserData();
    }
    // getUserData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar {...{ "user": user, "logout": logout }} />
        <div className="content">
          <h1>Home</h1>
          <p>Welcome to Geek Mingle!</p>
        </div>
      </header>
    </div>
  );
}

export default Home;
