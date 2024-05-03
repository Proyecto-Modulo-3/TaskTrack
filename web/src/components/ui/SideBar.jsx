import {
  CDBSidebar,
  // CDBSidebarFooter,
  CDBSidebarHeader,
} from "cdbreact";

const Sidebar = () => {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/lists"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            My lists
          </a>
        </CDBSidebarHeader>

        {/* <CDBSidebarFooter style={{ textAlign: "center" }}>

            METER EL CALENDARIO COMO SI FUERA EL FOOTER

        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
