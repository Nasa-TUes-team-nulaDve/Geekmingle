import React, { useState } from 'react';

import { useUser } from '../Contexts/userContext';

function Navbar() {
  const { logout, user } = useUser();

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button>All Projects</button>
        {user.username !== '' && (
          <>
            <button>Your Project</button>
            <button>Create a Project</button>
          </>
        )}
      </div>
      <div className="navbar-right">
        {user.username !== '' ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={logout}>Login</button>
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
