import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";

const About = () => {
  const a = useContext(NoteContext);
  return (
    <>
      <h1>
        AboutPage {a.state.page} and name is {a.name}
      </h1>
      <p>Color of context is {a.color}</p>
    </>
  );
};
export default About;
