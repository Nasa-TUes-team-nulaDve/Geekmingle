import React, { useEffect, useState } from "react";

import "./Login.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router

const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("jwtToken");

		if (token !== null) {
			// Redirect to the login page if no token is found
			window.location.href = "/";
		}
	}, []);

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const payload = {
				username: formData.username,
				password: formData.password,
			};

			// Replace 'YOUR_API_URL' with the actual API endpoint from your .env file
			const response = await fetch(
				process.env.REACT_APP_SERVER_URL + "/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);

			if (response.ok) {
				const data = await response.json();
				// Assuming your server sends back access and refresh tokens
				const jwtToken = data.token;
				// Store tokens securely (e.g., in localStorage)
				localStorage.setItem("jwtToken", jwtToken);
				navigate("/");
			} else {
				setLoginError("Invalid username or password");
			}
		} catch (error) {
			console.error("Error:", error);
		}

		// Clear the password field
		setFormData({
			...formData,
			password: "",
		});
	};

	return (
		<div className="login-root">
			<div className="login-container">
				<h2>Login</h2>
				<form onSubmit={handleSubmit} className="login-form">
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<div className="show-password">
							<input
								type="checkbox"
								onChange={() => setShowPassword(!showPassword)}
							/>
							Show Password
						</div>
					</div>
					{loginError && <p className="error">{loginError}</p>}
					<button type="submit" className="submit-button">
						Login
					</button>
					{/* Add a button to navigate to the registration page */}
					<Link to="/register" className="register-button">
						Dont have an account? Register here
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;
