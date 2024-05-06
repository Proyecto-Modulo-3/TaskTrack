// import { Link } from "react-router-dom";
import ListDetail from "../components/lists/ListDetail";
import Sidebar from "../components/ui/SideBar";

function Board() {
  return (
      <>
        <div className="d-flex">
          <Sidebar />
          <div>
          <ListDetail />
          </div>
        </div>
        
    </>
  );
}

export default Board;
