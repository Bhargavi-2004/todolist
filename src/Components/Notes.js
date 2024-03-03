import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Noteitem from "./Noteitem";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes } = context;
  console.log(typeof notes);
  const { showAlert } = props;
  return (
    <>
      <div className="container">
        <h2>Your Notes</h2>
        <div className="row my-3">
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} note={note} showAlert={showAlert} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
