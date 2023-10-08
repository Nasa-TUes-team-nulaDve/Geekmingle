import React, { useEffect, useState } from "react";

import "./Login.css"; // Import the CSS file
import { useNavigate } from "react-router-dom"; // Import Link from React Router

const CreateProject = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category: "",
	});

	const [error, setError] = useState("");

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
				name: formData.name,
				description: formData.description,
				category: formData.category,
			};

			// Replace 'YOUR_API_URL' with the actual API endpoint from your .env file
			const response = await fetch(
				process.env.REACT_APP_SERVER_URL + "/project/create",
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
				navigate("/");
			} else {
				setError("Invalid name, description, or category");
			}
		} catch (error) {
			console.error("Error:", error);
		}

		// Clear the description field
		setFormData({
			...formData,
			name: "",
			description: "",
			category: "",
		});
	};

	return (
		<div className="login-root">
			<div className="login-container">
				<h2>Create a project</h2>
				<form onSubmit={handleSubmit} className="login-form">
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="category"> Category</label>
						<select
							id="category"
							name="category"
							value={formData.category}
						>
							{Array.from([
								"art and science",
								"music",
								"technology",
								"reading",
							]).map((category, idx) => (
								<option key={idx} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>

					{error && <p className="error">{error}</p>}
					<button type="submit" className="submit-button">
						Create Project
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateProject;
