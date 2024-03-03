import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  // Get All Note:
  const getAllNote = async () => {
    // API call:
    const response = await fetch(`${host}/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjZjMzM1OGFhZDA3MWFmOGY4YjRhIn0sImlhdCI6MTcwODMzOTg2Mn0.h0DD1gh8Y1yuw2F0hG9o5abGAeDQJgKrDsG269jZrwQ",
      },
      body: JSON.stringify(),
    });
    console.log(response);
    const json = await response.json();
    setNotes(json);
  };

  // Add Note:
  const addNote = async (title, description, tag) => {
    // API Call:
    const response = await fetch(`${host}/addnote`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjZjMzM1OGFhZDA3MWFmOGY4YjRhIn0sImlhdCI6MTcwODMzOTg2Mn0.h0DD1gh8Y1yuw2F0hG9o5abGAeDQJgKrDsG269jZrwQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);
    console.log("Adding a new note:");
    const note = {
      _id: "65d3482eba7284ec77588494s",
      user: "65cf6c3358aad071af8f8b4a",
      title: title,
      description: description,
      tag: tag,
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Update Note:
  const updateNote = async (id, title, description, tag) => {
    // API Call:
    const response = await fetch(`${host}/updateNote/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjZjMzM1OGFhZDA3MWFmOGY4YjRhIn0sImlhdCI6MTcwODMzOTg2Mn0.h0DD1gh8Y1yuw2F0hG9o5abGAeDQJgKrDsG269jZrwQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // Delete Note:
  const deleteNote = async (id) => {
    // API call:
    const response = await fetch(`${host}/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZjZjMzM1OGFhZDA3MWFmOGY4YjRhIn0sImlhdCI6MTcwODMzOTg2Mn0.h0DD1gh8Y1yuw2F0hG9o5abGAeDQJgKrDsG269jZrwQ",
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("Delete: ", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, getAllNote, addNote, updateNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
