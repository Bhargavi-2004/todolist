import React, { useContext, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, updateNote } = context;
  const { showAlert } = props;

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const editNote = (currentNote) => {
    ref.current.click();
    console.log(currentNote);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    console.log("new", note);
  };

  const handleClick = () => {
    refClose.current.click();
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Edited Successfully!!!", "success");
  };

  return (
    <>
      <Addnote showAlert={showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                  disabled={
                    note.etitle.length < 5 || note.edescription.length < 5
                  }
                >
                  Edit note
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Your Notes</h2>
        {notes.length === 0 && "No notes to display"}
        <div className="row no-gutters my-3">
          {notes.map((note) => {
            return (
              <Noteitem
                key={note._id}
                note={note}
                editNote={editNote}
                showAlert={showAlert}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
