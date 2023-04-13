import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../store/spots';
import SpotCard from './SpotCard';
// import { NavLink } from 'react-router-dom';
// import './Home.css';
function ManageSpotsPage() {

    const dispatch = useDispatch();
    const spots = Object.values(useSelector((state) => state.spots.allSpots));

    useEffect(() => {
        dispatch(spotActions.loadCurrentSpots())
    }, [ dispatch ]);

    return (


        <div className='tile-list'>

          {spots.map(spot =>
              <SpotCard manage={true} key={spot.id} item={spot}></SpotCard>
          )}


        </div>
    );
}


export default ManageSpotsPage;
