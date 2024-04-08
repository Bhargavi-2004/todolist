import Notes from "./Notes";

const Home = (props) => {
  const { showAlert } = props;

  return (
    <>
      <div className="row no-gutters">
        <div className="col-md-0 col-lg-5 col-xl-4 d-md-none d-lg-block">
          <div className="login-container"></div>
        </div>
        <div className="col-md-12 col-lg-7 col-xl-8 note">
          <Notes showAlert={showAlert} />
        </div>
      </div>
    </>
  );
};
export default Home;
