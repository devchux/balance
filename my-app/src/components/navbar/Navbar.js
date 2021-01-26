import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  useEffect(() => {
    let navbarToggleButton = document.querySelector(".navbar-toggle-button");
    let nav = document.querySelector("nav");
    let status = false;

    navbarToggleButton.addEventListener("click", () => {
      if (status === false) {
        nav.style.display = "block";
        nav.classList.remove("navbar-slide-in");
        nav.classList.add("navbar-slide-out");
        status = true;
      } else {
        nav.style.display = "block";
        nav.classList.remove("navbar-slide-out");
        nav.classList.add("navbar-slide-in");
        setTimeout(() => {
          nav.style.display = "none";
        }, 800);
        status = false;
      }
    })

    window.addEventListener('click', (e) => {
      let containers = [nav, navbarToggleButton]
      if(status) {
        if(!containers.includes(e.target)) {
          navbarToggleButton.click()
        }
      }
    })
  }, []);
  return (
    <div className="navbar-container">
      <button
        type="button"
        className="navbar-toggle-button btn btn-primary d-md-none"
      >
        Menu
      </button>
      <nav>
        <div className="navbar-logo-container">
          <h1>Balance</h1>
        </div>
        <div className="navbar-center-content">
          <NavLink to="/dashboard/profile">Profile</NavLink>
          <NavLink to="/dashboard/add">Add</NavLink>
          <NavLink to="/dashboard/credits">Credits</NavLink>
          <NavLink to="/dashboard/debits">Debits</NavLink>
        </div>
        <div className="navbar-bottom-content">
          <Link to="/logout">Sign Out</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
