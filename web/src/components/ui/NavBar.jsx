import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth.context";

const renderNavLinkActive = ({ isActive }) =>
  isActive ? "nav-link active" : "nav-link";

function NavBar() {
  const { user, doLogout } = useContext(AuthContext);
  const isCalendar = window.location.pathname === "/calendar";
  const buttonText = isCalendar ? "Board" : "Calendar";
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isCalendar) {
      navigate("/home");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav
      className={`main-navbar navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <Link
                className="navbar-brand mb-0 h1"
                to={window.location.pathname}
              >
                TaskTrack
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink
                  className={renderNavLinkActive}
                  to={isCalendar ? "/home" : "/calendar"}
                  onClick={handleClick}
                >
                  {buttonText}
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className={renderNavLinkActive} to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={renderNavLinkActive} to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <>
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
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
