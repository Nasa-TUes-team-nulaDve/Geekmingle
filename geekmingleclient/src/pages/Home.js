import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Check if the user has a token in local storage
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // Redirect to the login page if no token is found
      window.location.href = '/login';
    }
  }, []);

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

export default App;
