import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OfferIcon from "../assets/svg/localOfferIcon.svg?component";
import ExploreIcon from "../assets/svg/exploreIcon.svg?component";
import PersonOutlineIcon from "../assets/svg/personOutlineIcon.svg?component";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const matchPathRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li
            className="navbarListItem"
            onClick={() => {
              navigate("/explore");
            }}
          >
            <ExploreIcon
              fill={matchPathRoute("/explore") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                matchPathRoute("/explore")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>
          <li
            className="navbarListItem"
            onClick={() => {
              navigate("/offers");
            }}
          >
            <OfferIcon
              fill={matchPathRoute("/offers") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                matchPathRoute("/offers")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offers
            </p>
          </li>
          <li
            className="navbarListItem"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <PersonOutlineIcon
              fill={matchPathRoute("/profile]") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                matchPathRoute("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Proflie
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
