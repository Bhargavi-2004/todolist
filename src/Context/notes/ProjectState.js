import { useState } from "react";
import ProjectContext from "./ProjectContext";
import { useEffect } from "react";

const ProjectState = (props) => {
  const [color, setColor] = useState("Dark");

  useEffect(() => {
    setInterval(() => {
      setColor("Light");
    }, 3000);
  });

  const host = "http://localhost:5000";

  const [projects, setProjects] = useState([]);

  // Get all Projects:
  const getAllProject = async () => {
    // API call:
    const response = await fetch(`${host}/fetchallprojects`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    setProjects(json);
  };

  // Add peoject:
  const addProject = async (projectTitle, projectLink) => {
    // API call:
    const response = await fetch(`${host}/addproject`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ projectTitle, projectLink }),
    });
    const project = await response.json();
    setProjects(projects.concat(project));
  };

  // Delete project:
  const deleteProject = async (id) => {
    // API call:
    // eslint-disable-next-line
    const response = await fetch(`${host}/deleteproject/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newProject = projects.filter((project) => {
      return project._id !== id;
    });
    setProjects(newProject);
  };

  // Update project:
  const updateProject = async (id, projectTitle, projectLink) => {
    // API call:
    // eslint-disable-next-line
    const response = await fetch(`${host}/updateproject/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ projectTitle, projectLink }),
    });

    let newProject = JSON.parse(JSON.stringify(projects));

    for (let index = 0; index < newProject.length; index++) {
      const element = newProject[index];
      if (element._id === id) {
        newProject[index].projectTitle = projectTitle;
        newProject[index].projectLink = projectLink;
        break;
      }
    }
    setProjects(newProject);
  };

  return (
    <ProjectContext.Provider
      value={{
        color,
        setColor,
        projects,
        getAllProject,
        addProject,
        deleteProject,
        updateProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
