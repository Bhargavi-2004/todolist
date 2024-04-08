import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../index.css";

const Login = (props) => {
  const host = "http://localhost:5000";
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
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
    setCredential({ email: "", password: "" });
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
        <div className="col-4">
          <div className="login-container"></div>
        </div>
        <div className="co-8">
          <div className="container">
            <h1>Login</h1>
            <form className="form-con" onSubmit={handleSubmit}>
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

export default Login;