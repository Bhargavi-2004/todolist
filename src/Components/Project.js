import React from "react";
import { Link } from "react-router-dom";
import Projectitem from "./Projectitem";

const Project = () => {
  return (
    <>
      <h1 className="projecth1">
        <Link className="pname">My Projects</Link>
      </h1>
      <div className="row">
        <div className="col-4">
          <div className="pimage"></div>
        </div>
        <div className="col">
          <div className="row">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link>
                  <i
                    className="bi bi-folder-fill pfolder"
                    data-toggle="collapse"
                  ></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link>New</Link>
              </li>
              <li className="nav-item">
                <Link>Open</Link>
              </li>
            </ul>
          </div>
          <div className="row">
            <Projectitem />
          </div>
        </div>
      </div>
    </>
  );
};
export default Project;
