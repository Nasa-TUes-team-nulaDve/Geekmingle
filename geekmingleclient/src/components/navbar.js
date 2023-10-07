import React, { useState } from 'react';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false); // Track user login status

  const handleLogin = () => {
    // Implement your login logic here
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setLoggedIn(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button>All Projects</button>
        {loggedIn && (
          <>
            <button>Your Project</button>
            <button>Create a Project</button>
          </>
        )}
      </div>
      <div className="navbar-right">
        {loggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
        <img
          src="your-profile-image.jpg"
          alt="Your Profile"
          className="profile-image"
        />
      </div>
    </div>
  );
}

export default Navbar;
