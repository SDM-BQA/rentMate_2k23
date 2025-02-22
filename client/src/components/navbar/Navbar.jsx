import { useContext, useState } from "react";
import UserContext from "../../api/contextApi";
import { AiFillCaretDown } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa";
import ReactSwitch from "react-switch";
import "./Navbar.css";
// import { HashLink } from "react-router-hash-link";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();

  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const [navUserDrop, setNavUserDrop] = useState(false);
  const { theme, toggleTheme, user, setUser } = useContext(UserContext);

  const handleUserLogOut = () => {
    navigate("/");
    setUser(false);
  };

  const handleUserDropDown = () => {
    setNavUserDrop((prev) => !prev);
  };

  return (
    <div className="navCon" data-theme={theme}>
      <div className="navbar" id="nav">
        <Link to="/">
          <div className="navlogo">
            <img src="/l2.png" alt="Nav Logo" />
          </div>
        </Link>
        <ul ref={navRef} className="navMenu">
          <Link className="link" to="/" onClick={showNavbar}>
            <li>Home</li>
          </Link>
          {user && (
            <Link to="/rentSection" className="link" onClick={showNavbar}>
              <li>
                {user.userType === "tenant" ? "Rent a Home" : "My Property"}
              </li>
            </Link>
          )}
          {user && (
            <Link className="link" to="/about" onClick={showNavbar}>
              <li>About Us</li>
            </Link>
          )}{" "}
          {user && (
            <Link className="link" to="/contact" onClick={showNavbar}>
              <li>Contact Us</li>
            </Link>
          )}
          {!user && (
            <Link to="/login" className="link" onClick={showNavbar}>
              <li className="auth">Login/ Signup</li>
            </Link>
          )}
          {user && (
            <div className="navUser" id="deskUser" onClick={handleUserDropDown}>
              <div className="userPic"></div>
              <div className="userName">{user.userName}</div>
              <AiFillCaretDown
                className="downIco"
                onClick={handleUserDropDown}
              />

              {navUserDrop && (
                <div className="dropDownUserNav">
                  <Link className="link" to="/myProfile">
                    <p>My Profile</p>
                  </Link>
                  <p onClick={handleUserLogOut}>Log Out</p>
                </div>
              )}
            </div>
          )}
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </ul>

        <div className="navRight" id="mobileUser">
          {user && (
            <div className="navUser">
              <div className="userPic"></div>
              <div className="userName">{user.userName}</div>
              <AiFillCaretDown className="downIco" />
              <div className="dropDownUserNav">
                <Link to="/myProfile" className="link">
                  <p>My Profile</p>
                </Link>
                <p onClick={handleUserLogOut}>Log Out</p>
              </div>
            </div>
          )}
          <button className="nav-btn" onClick={showNavbar}>
            <FaBars />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
