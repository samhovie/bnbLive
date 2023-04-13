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


    <div className=' navigation-container flex-sb'>

      <div className='nav-item flex-ctr'>

        <NavLink to='/'>
        <div>
          {/* <i className="fa-solid fa-microphone-lines"></i> */}
          <img style={{width:'48px', height:'48px'}} className='flex-ctr' alt='logo' src="https://livebnbbucket.s3.amazonaws.com/favicon.png"></img>
        </div>

        <div className='flex-ctr'>
          <h1>bnbLive</h1>
        </div>
        </NavLink>

      </div>

      <div  className='nav-item flex-ctr'>

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
