import Notes from "./Notes";

const Home = (props) => {
  const { showAlert } = props;
 
  return (
    <>
      <div className="row no-gutters">
        <div className="col-lg-5 col-xl-4">
          <div className="login-container"></div>
        </div>
        <div className="col-lg-7 col-xl-8">
          <Notes showAlert={showAlert} />
        </div>
      </div>
    </>
  );
};
export default Home;
