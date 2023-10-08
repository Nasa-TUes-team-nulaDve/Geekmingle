import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";
import { jwtRequest } from "../utils/JWTRequest";

import Navbar from "./Navbar";

import Home from "../pages/Home";
// import AllProjects from "./AllProjects"; // Import your AllProjects component
// import UserProfile from "./UserProfile"; // Import your UserProfile component
// import NotFound from "./NotFound"; // Import a NotFound component for unhandled routes

import "./Layout.css"; // Import your CSS file

function Layout() {
	const { user, setUser, logout } = useUser();

	useEffect(() => {
		const getUserData = async () => {
			const userData = await jwtRequest("auth/me", "GET", null, logout);

			setUser(userData);

			// setUser({
			// 	username: "Petar",
			// 	ownProjectId: null,
			// 	associatedProjects: [],
			// });
		};
		// // Check if the user has a token in local storage
		const token = localStorage.getItem("jwtToken");
		if (!token) {
			// Redirect to the login page if no token is found
			setUser({
				username: "",
				ownProjectId: null,
				associatedProjects: [],
			});
		} else {
			getUserData();

			// setUser({
			// 	username: "Petar",
			// 	ownProjectId: null,
			// 	associatedProjects: [],
			// });
		}
		// getUserData();
	}, []);

	return (
		<div className="layout">
			<Navbar {...{ user: user, logout: logout }} />
			<div className="content">
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
