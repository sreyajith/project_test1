import React, { useContext, useState } from "react";
import logo from "../imgs/logo.png";
import "./navbar.css";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../App";
import UserNavigationPanel from "./user-navigation-component";

const NavBar = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const [userNavPanel, setUserNavPanel] = useState(false);
  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };
  const { userAuth } = useContext(UserContext);
  const access_token = userAuth ? userAuth.access_token : null;
  const profile_img = userAuth ? userAuth.profile_img : null;
  


  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <Link to="/">
          <img src={logo} className="navbar-icon" alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <button
          className="toggle-search-btn bg-transparent border-0 d-lg-none"
          onClick={toggleSearchBar}
        >
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </button>

        <div className={`search-container ${searchVisible ? "visible" : ""}`}>
          <div className="input-group">
            <span className="input-group-text bg-transparent border-0">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="form-control bg-grey py-2 pl-6 pr-12 md-pr-6 rounded-pill border-1"
            />
          </div>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/editor" className="nav-link">
                <i className="bi bi-pencil-square"></i>
                <p>Write</p>
              </Link>
            </li>

            {access_token ? (
              <>
                <Link
                  to="/dashboard/notification"
                  className="btn btn-secondary rounded-pill position-relative hover:bg-black-10" 
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <i className="bi bi-bell text-2xl mt-3"></i>
                </Link>
                <div
                  className="position-relative"
                  onClick={handleUserNavPanel}
                  onBlur={handleBlur}
                  style={{ marginLeft: '8px' }} 
                >
                  <button
                    className="btn btn-secondary rounded-pill position-relative hover:bg-black-10"
                    style={{ width: "3rem", height: "3rem" }}
                  >
                    <img
                      src={profile_img}
                      alt="Profile"
                      className="img-fluid rounded-circle"
                    />
                  </button>
                  {userNavPanel ? <UserNavigationPanel className="user-navigation-panel" /> : ""}
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/signin"
                    className="nav-link bg-dark text-light sign px-4"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="nav-link sign bg-light-grey px-4"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
