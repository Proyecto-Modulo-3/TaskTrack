import { Link, NavLink } from "react-router-dom";
function NavBar() {
  return (
    <nav className="main-navbar navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand mb-0 h1" to="/">
          TaskTrack
        </Link>

        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item"><NavLink to="/register">Register</NavLink></li>
                <li className="nav-item "><NavLink  to="/login">Login</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
