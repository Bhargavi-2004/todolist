import { useState, useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "65d341db212d90bebfb5ea87",
      user: "65cf6c3358aad071af8f8b4a",
      title: "Evening Schedule",
      description: "Complete your web project",
      tag: "Web project",
      __v: 0,
    },
    {
      _id: "65d34804ba7284ec77588490",
      user: "65cf6c3358aad071af8f8b4a",
      title: "Night Schedule",
      description: "Contest is there",
      tag: "contest",
      __v: 0,
    },
    {
      _id: "65d3481bba7284ec77588492",
      user: "65cf6c3358aad071af8f8b4a",
      title: "Impulse",
      description: "Many games in this day!",
      tag: "Fun",
      __v: 0,
    },
    {
      _id: "65d3482eba7284ec77588494",
      user: "65cf6c3358aad071af8f8b4a",
      title: "Sunday",
      description: "Complete your web project!",
      tag: "Fun",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
