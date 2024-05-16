import { Popover } from "react-tiny-popover";
import { CDBSidebar, CDBSidebarHeader } from "cdbreact";
import { useContext, useState } from "react";
import CreateListForm from "../lists/CreateListForm";
import { Link } from "react-router-dom";
import AllLists from "../lists/AllLists";
import AuthContext from "../../contexts/auth.context";

const CalendarSidebar = () => {
  const [showPop, setShowPop] = useState(false);
  const [lists, setLists] = useState([]);
  const { user } = useContext(AuthContext);


  const togglePopover = () => {
    setShowPop(!showPop);
  };
  const handleClosePopover = () => {
    setShowPop(false);
  };

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader>
          <div className="mx-5">
            <Link
              to="/home"
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
                <div className="form">
                  <button className="mx-5" onClick={togglePopover}>
                    <i className="fa fa-times"></i>
                  </button>
                  <CreateListForm onClose={handleClosePopover} />
                </div>
              }
            >
              <button className="mx-5" onClick={togglePopover}>
                <i className="fa fa-plus"></i>
              </button>
            </Popover>
          </div>
        </CDBSidebarHeader>

        <AllLists lists={lists.filter((list) => list.owner === user.id)} />
      </CDBSidebar>
    </div>
  );
};

export default CalendarSidebar;
