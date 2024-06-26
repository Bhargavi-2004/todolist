import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navigate } from "react-router";

const Navbar = (props) => {
  let location = useLocation();

  const handleLogout = () => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      props.showAlert(
        "You are not loggedin! Please Login the after you can logout!",
        "danger"
      );
    } else {
      localStorage.removeItem("token");
      props.showAlert("Logged out Successfully!!", "success");
      <Navigate to="/login" />;
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark g-0 navBar">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="#">
            INotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }text-white`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }text-white`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/project" ? "active" : ""
                  }text-white`}
                  to="/project"
                >
                  My Projects
                </Link>
              </li>
            </ul>
            <Link
              className="btn btn-outline-primary text-white my-2 mx-2 signup"
              to="/signup"
              role="submit"
            >
              SignUp
            </Link>
            <Link
              className="btn btn-outline-primary text-white my-2 mx-2 login"
              to="/login"
              role="submit"
            >
              Login
            </Link>

            <Link
              className="btn btn-outline-primary text-white my-2 mx-2 logout"
              to="/logout"
              role="submit"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;