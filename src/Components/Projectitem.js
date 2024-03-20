import React, { useContext } from "react";
import ProjectContext from "../Context/notes/ProjectContext";
import { Link } from "react-router-dom";
const Projectitem = (props) => {
  const projectContext = useContext(ProjectContext);
  const { deleteProject } = projectContext;
  const { project, editProject } = props;

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3 mx-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{project.projectTitle}</h5>
              <i
                className="fa-sharp fa-solid fa-file-pen mx-2"
                onClick={() => {
                  editProject(project);
                  props.showAlert("Updated Successfully...!", "success");
                }}
              ></i>
              <i
                className="fa-sharp fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteProject(project._id);
                  props.showAlert("Deleted Successfully...!", "success");
                }}
              ></i>
            </div>
            <Link className="card-text" to={project.projectLink} target="_blank">
              {project.projectLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projectitem;
