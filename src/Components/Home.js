// import { useContext } from "react";
// import NoteContext from "../Context/notes/NoteContext";
import Addnote from "./Addnote";
import Notes from "./Notes";
const Home = (props) => {
  // const context = useContext(NoteContext);
  // const { notes, setNotes } = context;
  const { showAlert } = props;
  return (
    <>
      <div className="row">
        <div className="col-3">
          <div className="login-container"></div>
        </div>
        <div className="col-9">
          <Addnote showAlert={showAlert} />
          <Notes showAlert={showAlert} />
        </div>
      </div>
    </>
  );
};
export default Home;
