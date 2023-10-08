import React, { useState, useEffect } from "react";
import ProjectCard from "../Components/ProjectCard";

import "./Home.css";

function Home() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		// Fetch projects when the component mounts
		// fetch(`${process.env.REACT_APP_SERVER_URL}/project/getall`)
		//   .then((response) => response.json())
		//   .then((data) => setProjects(data))
		//   .catch((error) => console.error("Error fetching projects: ", error));
		setProjects([
			{
				description: "Improve code quality for project Furch2ilo",
				id: 12,
				members: ["alice", "bob"],
				name: "Furch2ilo Code Quality Enhancement",
				owner: "petur",
				skills: ["coding", "code review"],
			},
			{
				description: "Develop a coding tutorial",
				id: 13,
				members: null,
				name: "Coding Tutorial Project",
				owner: "petur",
				skills: ["coding", "teaching"],
			},
			{
				description: "Create a co2 emissions tracking system",
				id: 14,
				members: ["emma", "david"],
				name: "CO2 Emissions Tracker",
				owner: "petur",
				skills: ["coding", "environment"],
			},
			{
				description: "Design a website for project Furch2ilo",
				id: 15,
				members: ["carol"],
				name: "Furch2ilo Website Design",
				owner: "petur",
				skills: ["web design", "coding"],
			},
			{
				description: "Organize coding workshops",
				id: 16,
				members: ["frank"],
				name: "Coding Workshops",
				owner: "petur",
				skills: ["coding", "teaching"],
			},
			{
				description: "Create a co2 reduction strategy",
				id: 17,
				members: ["sophia", "george"],
				name: "CO2 Reduction Strategy",
				owner: "petur",
				skills: ["environment", "strategy"],
			},
			{
				description: "Develop a mobile app for project Furch2ilo",
				id: 18,
				members: null,
				name: "Furch2ilo Mobile App",
				owner: "petur",
				skills: ["mobile app development", "coding"],
			},
			{
				description: "Conduct a code audit for project Furch2ilo",
				id: 19,
				members: ["olivia"],
				name: "Furch2ilo Code Audit",
				owner: "petur",
				skills: ["coding", "code review"],
			},
			{
				description: "Create a co2 awareness campaign",
				id: 20,
				members: ["james", "linda"],
				name: "CO2 Awareness Campaign",
				owner: "petur",
				skills: ["environment", "marketing"],
			},
			{
				description: "Build a co2 emissions calculator",
				id: 21,
				members: ["chloe", "michael"],
				name: "CO2 Emissions Calculator",
				owner: "petur",
				skills: ["coding", "environment"],
			},
		]);
		localStorage.setItem(
			"projects",
			JSON.stringify([
				{
					description: "Improve code quality for project Furch2ilo",
					id: 12,
					members: ["alice", "bob"],
					name: "Furch2ilo Code Quality Enhancement",
					owner: "petur",
					skills: ["coding", "code review"],
				},
				{
					description: "Develop a coding tutorial",
					id: 13,
					members: null,
					name: "Coding Tutorial Project",
					owner: "petur",
					skills: ["coding", "teaching"],
				},
				{
					description: "Create a co2 emissions tracking system",
					id: 14,
					members: ["emma", "david"],
					name: "CO2 Emissions Tracker",
					owner: "petur",
					skills: ["coding", "environment"],
				},
				{
					description: "Design a website for project Furch2ilo",
					id: 15,
					members: ["carol"],
					name: "Furch2ilo Website Design",
					owner: "petur",
					skills: ["web design", "coding"],
				},
				{
					description: "Organize coding workshops",
					id: 16,
					members: ["frank"],
					name: "Coding Workshops",
					owner: "petur",
					skills: ["coding", "teaching"],
				},
				{
					description: "Create a co2 reduction strategy",
					id: 17,
					members: ["sophia", "george"],
					name: "CO2 Reduction Strategy",
					owner: "petur",
					skills: ["environment", "strategy"],
				},
				{
					description: "Develop a mobile app for project Furch2ilo",
					id: 18,
					members: null,
					name: "Furch2ilo Mobile App",
					owner: "petur",
					skills: ["mobile app development", "coding"],
				},
				{
					description: "Conduct a code audit for project Furch2ilo",
					id: 19,
					members: ["olivia"],
					name: "Furch2ilo Code Audit",
					owner: "petur",
					skills: ["coding", "code review"],
				},
				{
					description: "Create a co2 awareness campaign",
					id: 20,
					members: ["james", "linda"],
					name: "CO2 Awareness Campaign",
					owner: "petur",
					skills: ["environment", "marketing"],
				},
				{
					description: "Build a co2 emissions calculator",
					id: 21,
					members: ["chloe", "michael"],
					name: "CO2 Emissions Calculator",
					owner: "petur",
					skills: ["coding", "environment"],
				},
			])
		);
	}, []);

	return (
		<div className="home">
			<h1>All Projects</h1>
			<div className="project-list">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</div>
	);
}

export default Home;
