import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		ownProjectId: null,
		associatedProjects: [],
	});

	const logout = () => {
		// Clear user data when logging out
		localStorage.removeItem("jwtToken");
		setUser({
			username: "",
			ownProjectId: null,
			associatedProjects: [],
		});

		// Redirect to the login page
		window.location.href = "/";
	};

	return (
		<UserContext.Provider value={{ user, setUser, logout }}>
			{children}
		</UserContext.Provider>
	);
};
