import Sidebar from "../components/ui/SideBar";

function Home({ darkMode }) {
  return (
    <>
      <div className="d-flex">
        <Sidebar darkMode={darkMode} />
      </div>
    </>
  );
}

export default Home;
