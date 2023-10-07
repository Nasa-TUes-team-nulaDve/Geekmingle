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
        "description": "furch2ilo",
        "id": 11,
        "members": null,
        "name": "penis1",
        "owner": "petur",
        "skills": ["co2ding"]
      }, {
        "description": "furch2ilo",
        "id": 12,
        "members": null,
        "name": "penis1",
        "owner": "petur",
        "skills": ["co2ding"]
      }, {
        "description": "furch2ilo",
        "id": 13,
        "members": null,
        "name": "penis1",
        "owner": "petur",
        "skills": ["co2ding"]
      }, {
        "description": "furch2ilo",
        "id": 14,
        "members": null,
        "name": "penis1",
        "owner": "petur",
        "skills": ["co2ding"]
      }, {
        "description": "furch2ilo",
        "id": 15,
        "members": null,
        "name": "penis1",
        "owner": "petur",
        "skills": ["co2ding"]
      }, {
        "description": "furch2ilo",
        "id": 16,
        "members": ["Goro", "Radi"],
        "name": "penis1",
        "owner": "petur",
        "skills": ["co2ding", "furfurfur"]
      }
    ])
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
