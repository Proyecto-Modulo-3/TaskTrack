import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth.context";

const renderNavLinkActive = ({ isActive }) =>
  isActive ? "nav-link active" : "nav-link";

function NavBar() {
  const { user, doLogout } = useContext(AuthContext);
  const isCalendar = window.location.pathname === "/calendar";
  const buttonText = isCalendar ? "Board" : "Calendar";
  const navigate = useNavigate();

  console.log(user);

  const handleClick = () => {
    if (isCalendar) {
      navigate("/home");
    }
  };

  return (
    <nav className="main-navbar navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {!user && (
              <>
                <Link
                  className="navbar-brand mb-0 h1"
                  to={window.location.pathname}
                >
                  TaskTrack
                </Link>
                <li className="nav-item">
                  <NavLink className={renderNavLinkActive} to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className={renderNavLinkActive} to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <>
                <Link
                  className="navbar-brand mb-0 h1"
                  to={window.location.pathname}
                >
                  TaskTrack
                </Link>
                <li className="nav-item">
                  <NavLink
                    className={renderNavLinkActive}
                    to={isCalendar ? "/home" : "/calendar"}
                    onClick={handleClick}
                  >
                    {buttonText}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={renderNavLinkActive} to="/profile">
                    <i className="fa fa-user"></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={doLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
