import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Signup = (props) => {
  const host = "http://localhost:5000";
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credential;

    if (password !== cpassword) {
      props.showAlert("Passwords do not match!", "danger");
      return;
    }

    try {
      const response = await fetch(`${host}/createuser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        setRedirectToHome(true);
        props.showAlert("Account loggedin Successfully...!", "success");
      } else {
        props.showAlert("Invalid details", "danger");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="row no-gutters">
        <div className="col-xl-4">
          <div className="login-container"></div>
        </div>
        <div className="col-xl-8">
          <div className="container">
            <h1>Signup</h1>
            <form className="form-con" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  value={credential.name}
                  onChange={onchange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  value={credential.email}
                  onChange={onchange}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  value={credential.password}
                  onChange={onchange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="cpassword"
                  className="form-control"
                  id="cpassword"
                  value={credential.cpassword}
                  onChange={onchange}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;