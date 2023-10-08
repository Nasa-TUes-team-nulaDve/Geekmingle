import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from "./Contexts/UserContext";

import Layout from "./Components/MainPageLayout";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import CreateProject from "./pages/CreateProject";

import Login from "./pages/Login";
import Register from "./pages/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<UserProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Layout />}>
					<Route path="projects" element={<Home />} />
					<Route path="projects/create" element={<CreateProject />} />
					<Route path="projects/:id" element={<ProjectPage />} />
					{/* <Route path="profile" element={<UserProfile />} /> */}
				</Route>
				<Route path="*" element={<div>404 not found</div>} />
			</Routes>
		</BrowserRouter>
	</UserProvider>
);
