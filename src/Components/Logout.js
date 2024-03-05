import React from "react";
import Login from "./Login";
const Logout = (props) => {
  const { showAlert } = props;
  return (
    <>
      <Login showAlert={showAlert} />
    </>
  );
};

export default Logout;
