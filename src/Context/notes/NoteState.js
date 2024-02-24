import { useState, useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const s1 = {
    page: "home",
    no: 1,
  };
  const [state, setState] = useState(s1);

  useEffect(() => {
    setTimeout(() => {
      setState({
        page: "about",
        no: 2,
      });
    }, 1000);
  }, []);
  return (
    <NoteContext.Provider value={{ state }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
