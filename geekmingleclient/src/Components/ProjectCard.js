import React, { useState } from "react";
import "./ProjectCard.css";

function ProjectCard({ project }) {
    const { description, id, members, name, owner, skills } = project;
    const sortedSkills = skills.sort().join(", ");

    // State to keep track of which member's tooltip is being hovered
    const [hoveredMember, setHoveredMember] = useState(null);

    // Function to handle hover events on member circles
    const handleMemberHover = (event, index) => {
        setHoveredMember(index);
        event.stopPropagation(); // Prevent event propagation to fix the issue
    };

    // Function to hide the tooltip on hover out
    const handleMemberHoverOut = () => {
        setHoveredMember(null);
    };

    // Function to generate a consistent color based on input string
    function stringToColor(str) {
        // Concatenate the project ID to the input string
        const combinedString = str + id.toString();

        let hash = 0;
        for (let i = 0; i < combinedString.length; i++) {
            hash = combinedString.charCodeAt(i) + ((hash << 5) - hash);
        }

        const color = Math.floor(Math.abs((Math.sin(hash) * 16777215) % 16777215)).toString(16);
        return `#${'0'.repeat(6 - color.length)}${color}`;
    }

    // Extract the first letter of each member's name and add the owner to the list
    const memberInitials = members
        ? [owner, ...members].map((member) => member.charAt(0).toUpperCase())
        : [owner.charAt(0).toUpperCase()];

    // Generate colors based on member initials
    const memberColors = memberInitials.map((initial, index) =>
        stringToColor(name + initial + index)
    );

    return (
        <div className="project-card">
            <h2>{name}</h2>
            <p>{description}</p>
            <div className="member-list">
                {memberInitials.map((initial, index) => (
                    <div
                        key={index}
                        className="member-circle"
                        style={{ backgroundColor: memberColors[index] }}
                        onMouseEnter={(event) => handleMemberHover(event, index)} // Handle hover event
                        onMouseLeave={handleMemberHoverOut} // Handle hover out event
                    >
                        {hoveredMember === index ? ( // Show tooltip on hover
                            <div className="member-tooltip">
                                {/* {members ? members[index] : owner} */}
                                {index === 0 ? (owner.charAt(0).toUpperCase() + owner.slice(1)) :
                                    (members[index - 1].charAt(0).toUpperCase() + members[index - 1].slice(1))}
                            </div>
                        ) : (
                            <>{initial}</>
                        )}
                    </div>
                ))}
            </div>
            <div className="skills-list">
                <strong>Skills:</strong> {sortedSkills}
            </div>
        </div>
    );
}

export default ProjectCard;
