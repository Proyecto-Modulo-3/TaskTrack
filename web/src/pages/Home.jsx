// import { Link } from "react-router-dom";
import ListDetail from "../components/lists/ListDetail";
import Sidebar from "../components/ui/SideBar";
import Board from "../components/board/Board";

function Home() {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <Board />
      </div>
    </>
  );
}

export default Home;
