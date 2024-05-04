// import { useState } from "react";
// import { Popover } from "react-tiny-popover";
import {
  CDBSidebar,
  // CDBSidebarFooter,
  CDBSidebarHeader,
} from "cdbreact";


const Sidebar = () => {
  // const [showpop, setShowpop] = useState(false)


  return (
    <div style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader>
          <a
            href="/board"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            My lists
          </a>
          <div>

            {/* <Popover
              isOpen={showpop}
              positions={['right', 'top', 'bottom', 'left']}
              content={<div></div>}
            >

            </Popover>; */}
          </div>
        </CDBSidebarHeader>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
