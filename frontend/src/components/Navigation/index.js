import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <li>
  //       <ProfileButton user={sessionUser} />
  //     </li>
  //   );
  // } else {
  //   sessionLinks = (
  //     <li>
  //       <OpenModalButton
  //         buttonText="Log In"
  //         modalComponent={<LoginFormModal />}
  //       />
  //       <OpenModalButton
  //         buttonText="Sign Up"
  //         modalComponent={<SignupFormModal />}
  //       />
  //     </li>
  //   );
  // }

  return (
    <div className=" navigation-container flex-sb">
      <div className="nav-item flex-ctr">
        <NavLink to="/">
          <div className="flex-ctr">
            <img
              style={{ width: "48px", height: "48px" }}
              alt="logo"
              src="https://livebnbbucket.s3.amazonaws.com/favicon.png"
            ></img>
          </div>

          <div className="flex-ctr">
            <h1 id='main-title'>bnbLive</h1>
          </div>
        </NavLink>
      </div>

      <div className="flex-sb nav-item ">
        <div className="nav-link" style={{padding:'0 35px'}}>
          <NavLink to={`/spots/new`}>Create a Spot</NavLink>
        </div>

        {isLoaded && (
          <div className="flex-ctr">
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
