import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProjectContext from "../Context/notes/ProjectContext";

const AddProject = (props) => {
  const context = useContext(ProjectContext);
  const { addProject, getAllProject } = context;

  const [project, setProject] = useState({
    title: "",
    link: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token") !== null) getAllProject();
    // eslint-disable-next-line
  }, []);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  const handleClick = (event) => {
    event.preventDefault();
    addProject(project.title, project.link);
    setProject({ title: "", link: "" });
    props.showAlert("Added Successfully!!!", "success");
    props.setActiveLink(false);
  };

  const onchange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className="mx-3">Add a project</h1>
      <form>
        <div className="mb-3 mx-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            // ref={inputRef}
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>
        <div className="mb-3 mx-3">
          <label htmlFor="link" className="form-label">
            Link
          </label>
          <input
            type="text"
            className="form-control"
            id="link"
            name="link"
            onChange={onchange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mx-3"
          onClick={handleClick}
          disabled={project.title.length < 5 || project.link.length < 5}
        >
          Add project
        </button>
      </form>
    </>
  );
};

export default AddProject;
