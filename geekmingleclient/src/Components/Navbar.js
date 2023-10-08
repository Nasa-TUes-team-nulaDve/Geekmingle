import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css"; // Import your CSS file

function Navbar({ user, logout }) {
	const [clicked, setClicked] = useState();

	const navigate = useNavigate();
	useEffect(() => {}, [user]);

	return (
		<div className="navbar">
			<div className="navbar-left">
				<button
					className={
						"nav-button" + (clicked === "all" ? " clicked" : "")
					}
					onClick={() => {
						setClicked("all");
						navigate("/projects");
					}}
				>
					All Projects
				</button>
				{user.username !== "" && (
					<>
						<button
							className={
								"nav-button" +
								(clicked === "personal" ? " clicked" : "")
							}
							onClick={() => {
								navigate("/projects");
								setClicked("personal");
							}}
						>
							Your Projects
						</button>
						<button
							className={
								"nav-button" +
								(clicked === "create" ? " clicked" : "")
							}
							onClick={() => {
								setClicked("create");
								navigate("/projects/create");
							}}
						>
							Create a Project
						</button>
					</>
				)}
			</div>
			<div className="navbar-middle">
				<h1 className="navbar-title">Geek Mingle</h1>
			</div>
			<div className="navbar-right">
				{user.username !== "" ? (
					<>
						<button
							className="nav-button logout-button"
							onClick={logout}
						>
							Logout
						</button>
						<h1 className="username-text">
							Logged in as {user.username}
						</h1>

					</>
				) : (
					<button
						className="nav-button login-button"
						onClick={() => {
							navigate("/login");
						}}
					>
						Login
					</button>
				)}
			</div>
		</div>
	);
}

export default Navbar;
