import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="conatiner">
        <h1 className="abouth1">About Us</h1>
        <div className="row no-gutters">
          <div className="col-xl-5 col-md-12">
            <div className="aboutimage"></div>
          </div>
          <div className="col-xl-7 col-md-12">
            <div className="aboutPage">
              <ul>
                <li>
                  This to-do list application allows you to manage your tasks
                  efficiently. You can add new tasks, edit existing ones, mark
                  them as complete, and easily delete them when needed.
                </li>
                <li>Add a note here to keep track on your work.</li>
                <li>
                  Also you can add Projects and its Github link to open whenever
                  you want!
                </li>
                <li>
                  To-do list helpful to make a schedule according your time.
                </li>
                <li>
                  Provides you security- your notes are only available to you.
                </li>
              </ul>
              <h6>Make your profile by signing in our site.</h6>
              <Link to="/signup" className="aboutLink">
                Create an account
              </Link>
              <h6>
                Already have an account?{" "}
                <Link to="/login" className="aboutLink">
                  login
                </Link>
              </h6>
            </div>
          </div>
        </div>
        {/* <footer className="footer">copyright 2024</footer> */}
      </div>
    </>
  );
};
export default About;
