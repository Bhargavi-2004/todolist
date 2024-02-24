import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";

const About = () => {
  const a = useContext(NoteContext);
  return (
    <>
      <h1>AboutPage {a.state.page}</h1>
    </>
  );
};
export default About;
