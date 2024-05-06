// import { useState } from "react";
import { Popover } from "react-tiny-popover";
import {
  CDBSidebar,
  // CDBSidebarFooter,
  CDBSidebarHeader,
} from "cdbreact";
import { useState } from "react";
import CreateListForm from "../lists/CreateListForm";
import { Link } from "react-router-dom";
import AllLists from "../lists/AllLists";

const Sidebar = () => {
  const [showPop, setShowPop] = useState(false);
  const [lists, setLists] = useState([]);

  const handleCreate = (data) => {
    console.log(lists, data);
    setLists([...lists, { ...data }]);
  };

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader>
          <div className="mx-5">
            <Link
              to="/board"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              My lists
            </Link>

            <Popover
              isOpen={showPop}
              align="start"
              positions={["right", "top", "bottom", "left"]}
              content={
                <div className="mx-2">
                  <button className="mx-5" onClick={() => setShowPop(!showPop)}>
                    <i className="fa fa-times"></i>
                  </button>
                  <CreateListForm onCreate={handleCreate} />
                </div>
              }
            >
              <button className="mx-5" onClick={() => setShowPop(!showPop)}>
                <i className="fa fa-plus"></i>
              </button>
            </Popover>
          </div>
        </CDBSidebarHeader>
        <AllLists />
      </CDBSidebar>

    </div>
  );
};

export default Sidebar;
