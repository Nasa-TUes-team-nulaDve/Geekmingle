import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    username: '',
    email: '',
    ownProjectId: null,
    associatedProjects: [],
  });

  const logout = () => {
    // Clear user data when logging out
    setUser({
      isLoggedIn: false,
      username: '',
      email: '',
      ownProjectId: null,
      associatedProjects: [],
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
