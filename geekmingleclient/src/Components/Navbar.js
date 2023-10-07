import { useEffect } from "react";

function Navbar({ user, logout }) {
  useEffect(() => {
    console.log(user);
  }
    , [user]);

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
          <>
            <button onClick={logout}>Logout</button>
            <h1>Logged in as {user.username}</h1>
            <img
              src="your-profile-image.jpg"
              alt="Your Profile"
              className="profile-image"
            />
          </>
        ) : (
          <button onClick={() => { window.location.href = '/login' }}>Login</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
