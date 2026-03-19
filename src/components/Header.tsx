import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { information } from "../data/db/database";
import LineIcon from "react-lineicons";

function Header(): React.JSX.Element {
  const [navigationToggler, setNavigationToggler] = useState(false);

  const handleNavigationToggler = () => {
    setNavigationToggler(!navigationToggler);
  };

  return (
    <nav aria-label="Main navigation" className={navigationToggler ? "mi-header is-visible" : "mi-header"}>
      <button onClick={handleNavigationToggler} className="mi-header-toggler">
        {!navigationToggler ? (
          <LineIcon name="menu" />
        ) : (
          <LineIcon name="close" />
        )}
      </button>
      <div className="mi-header-inner">
        <div className="mi-header-image">
          <Link to="/">
            <img src={information.brandImage} alt="Sam Montalvo Jr — portrait" />
          </Link>
        </div>

        <ul className="mi-header-menu">
          <li>
            <NavLink to="/">
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/resume">
              <span>Resume</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolios">
              <span>Portfolio</span>
            </NavLink>
          </li>
          <li>
            <a
              href="https://medium.com/@sammontalvojr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Blogs</span>
            </a>
          </li>
          <li>
            <NavLink to="/contact">
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>
        <p className="mi-header-copyright">
          <b>Sam Montalvo Jr</b>
        </p>
      </div>
    </nav>
  );
}

export default Header;
