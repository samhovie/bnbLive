import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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


    <div className='container navigation-container flex-sb'>

      <div className='flex-ctr'>

        <NavLink to='/'>
        <div>
          <i className="fa-solid fa-microphone-lines"></i>
        </div>

        <div>
          <h1>LiveBnb</h1>
        </div>
        </NavLink>

      </div>

      <div  className='flex-ctr'>

        <div>
        <NavLink to={`/spots/new`}>Create a Spot</NavLink>

        </div>

        {isLoaded && (
      <div>
      <ProfileButton user={sessionUser} />
      </div>
        )}

      </div>
    </div>

  );
}

export default Navigation;
