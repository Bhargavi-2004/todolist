import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useState } from "react";
import Logout from "./Components/Logout";
import Project from "./Components/Project";
import ProjectState from "./Context/notes/ProjectState";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <ProjectState>
          <Router>
            <Navbar showAlert={showAlert} />
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route
                exact
                path="/about"
                element={<About showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/project"
                element={<Project showAlert={showAlert} />}
              />
              <Route
                exact
                path="/logout"
                element={<Logout showAlert={showAlert} />}
              />
            </Routes>
          </Router>
        </ProjectState>
      </NoteState>
    </>
  );
}

export default App;
