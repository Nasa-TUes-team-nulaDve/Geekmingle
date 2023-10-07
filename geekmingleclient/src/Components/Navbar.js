import { useEffect } from "react";
import "./Navbar.css"; // Import your CSS file

function Navbar({ user, logout }) {
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="nav-button">All Projects</button>
        {user.username !== '' && (
          <>
            <button className="nav-button">Your Project</button>
            <button className="nav-button">Create a Project</button>
          </>
        )}
      </div>
      <div className="navbar-middle">
        <h1 className="navbar-title">Geek Mingle</h1>
      </div>
      <div className="navbar-right">
        {user.username !== '' ? (
          <>
            <button className="nav-button logout-button" onClick={logout}>Logout</button>
            <h1 className="username-text">Logged in as {user.username}</h1>
            <img
              src="your-profile-image.jpg"
              alt="Your Profile"
              className="profile-image"
            />
          </>
        ) : (
          <button className="nav-button login-button" onClick={() => { window.location.href = '/login' }}>Login</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
