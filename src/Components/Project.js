import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Projectitem from "./Projectitem";
import ProjectContext from "../Context/notes/ProjectContext";
import { Navigate } from "react-router-dom";
import AddProject from "./AddProject";

const Project = (props) => {
  const projectContext = useContext(ProjectContext);
  const { projects, getAllProject, updateProject } = projectContext;
  const { showAlert } = props;

  useEffect(() => {
    if (localStorage.getItem("token") !== null) getAllProject();
    // eslint-disable-next-line
  }, []);

  const [project, setProject] = useState({
    id: "",
    etitle: "",
    elink: "",
  });

  const ref = useRef(null);

  const refClose = useRef(null);

  const onchange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const editProject = (currentproject) => {
    ref.current.click();
    console.log(currentproject._id);
    setProject({
      id: currentproject._id,
      etitle: currentproject.projectTitle,
      elink: currentproject.projectLink,
    });
  };

  const handleClick = () => {
    refClose.current.click();
    updateProject(project.id, project.etitle, project.elink);
    props.showAlert("Edited Successfully!!!", "success");
  };

  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <h1 className="projecth1">
        <Link className="pname" to="/project">
          My Projects
        </Link>
      </h1>
      <div className="row no-gutters">
        <div className="col-xl-5 col-xm-4">
          <div className="pimage"></div>
        </div>
        <div className="col-xl-7 col-xm-8">
          <div className="row no-gutters">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item pnew">
                <Link>
                  <i
                    className="bi bi-folder-fill pfolder"
                    data-toggle="collapse"
                  ></i>
                </Link>
              </li>
              <li className="nav-item pnew">
                <Link onClick={() => handleLinkClick("new")}>New</Link>
              </li>
            </ul>
          </div>
          {activeLink === "new" && (
            <AddProject showAlert={showAlert} setActiveLink={setActiveLink} />
          )}
          <button
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            ref={ref}
          >
            Launch demo modal
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit Ptoject
                  </h1>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="etitle"
                        name="etitle"
                        aria-describedby="emailHelp"
                        value={project.etitle}
                        onChange={onchange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="edescription"
                        name="edescription"
                        value={project.elink}
                        onChange={onchange}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleClick}
                      disabled={
                        project.etitle.length < 3 || project.elink.length < 5
                      }
                    >
                      Edit
                    </button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={refClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {projects.length === 0 && "No projects to display"}
          <div className="row no-gutters my-3">
            {projects.map((project) => {
              return (
                <Projectitem
                  key={project._id}
                  project={project}
                  showAlert={showAlert}
                  editProject={editProject}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Project;