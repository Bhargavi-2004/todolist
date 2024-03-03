import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";

const Addnote = (props) => {
  const context = useContext(NoteContext);
  const { addNote, getAllNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  // const inputRef = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "default" });
    // console.log("handleClick", note);
    props.showAlert("Added Successfully!!!", "success");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllNote();
  }, [note]);

  return (
    <>
      <div className="container">
        <h1>Add a note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              // ref={inputRef}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
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
              id="description"
              name="description"
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
              id="tag"
              name="tag"
              onChange={onchange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default Addnote;
