import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote, updateNote } = context;
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-sharp fa-solid fa-file-pen mx-2"
              onClick={() => {
                updateNote(note._id, note.title, note.description, note.tag);
                props.showAlert("Updated Successfully...!", "success");
              }}
            ></i>
            <i
              className="fa-sharp fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Successfully...!", "success");
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
