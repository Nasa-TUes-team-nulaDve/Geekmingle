import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./ProjectPage.css";

function ProjectPage() {
    const { id } = useParams();

    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        // fetch(`${process.env.REACT_APP_SERVER_URL}/project/${id}`)
        //     .then((response) => response.json())
        //     .then((data) => setProjectData(data))
        //     .catch((error) => console.error("Error fetching project data:", error));
        setProjectData({
            "description": "furch2ilo",
            "id": 11,
            "members": null,
            "name": "penis1",
            "owner": "petur",
            "skills": ["co2ding", "furfurfur", "skill3", "eqweqw", "furfurfur", "skill3", "eqweqw", "furfurfur", "skill3", "eqweqw"]
        })
    }, [id]);

    if (!projectData) {
        return <div>Loading...</div>;
    }

    if (projectData.members == null) {
        projectData.members = []
    }

    const { name, description, owner, skills, members } = projectData;

    // Function to generate a consistent color based on input string
    function stringToColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        const color = Math.floor(Math.abs((Math.sin(hash) * 16777215) % 16777215)).toString(16);
        return `#${'0'.repeat(6 - color.length)}${color}`;
    }

    // Ensure that the owner is at index 0 in the members array
    const updatedMembers = [owner, ...members];

    return (
        <div className="project-page">
            <div className="project-info">
                <div className="project-details">
                    <h1 className="project-title">
                        <div className="team-circle" style={{ backgroundColor: stringToColor(name) }}>
                            {name.charAt(0).toUpperCase()}
                        </div>
                        {name}
                    </h1>
                    <div className="project-description">{description}</div>
                </div>
                <div className="skills-list">
                    <h2>Skills:</h2>
                    <div className="skill-boxes">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="skill-box"
                                style={{ backgroundColor: stringToColor(skill) }}
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="contact-members-row">
                <div className="contact-owner">
                    <h2>Contact Owner:</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Your Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" rows="4" required></textarea>
                        </div>
                        <button type="submit">Send Email</button>
                    </form>
                </div>
                <div className="members-list">
                    <h2>Members:</h2>
                    <div className="member-boxes">
                        {updatedMembers.map((member, index) => (
                            <div key={index} className="member-box">
                                <div
                                    className="member-circle-projectpage"
                                    style={{ backgroundColor: stringToColor(member) }}
                                >
                                    {member.charAt(0).toUpperCase()}
                                </div>
                                <div className="member-name">{member}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectPage;
