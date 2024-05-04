import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../contexts/auth.context";

const renderNavLinkActive = ({ isActive }) =>
  isActive ? "nav-link active" : "nav-link";

function NavBar() {
  const { user, doLogout } = useContext(AuthContext);

  return (
    <nav className="main-navbar navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand mb-0 h1" to="/board">
          TaskTrack
        </Link>

        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className={renderNavLinkActive} to="/register">Register</NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className={renderNavLinkActive} to="/login">Login</NavLink>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="nav-item"><NavLink className={renderNavLinkActive} to="/calendar">Calendar</NavLink></li>
                <li className="nav-item"><NavLink className={renderNavLinkActive} to="/profile"><i className="fa fa-user"></i></NavLink></li>
                <li className="nav-item"><button className="nav-link" onClick={doLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
