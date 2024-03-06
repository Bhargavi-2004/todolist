import Notes from "./Notes";

const Home = (props) => {
  const { showAlert } = props;
 
  return (
    <>
      <div className="row">
        <div className="col-xl-2 col-xxl-2">
          <div className="login-container"></div>
        </div>
        <div className="col-xl-10 col-xxl-10">
          <Notes showAlert={showAlert} />
        </div>
      </div>
    </>
  );
};
export default Home;
