import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import SpotCard from '../SpotCard';
import { NavLink } from 'react-router-dom';
import './Home.css';

function Home() {

    const dispatch = useDispatch();
    const allSpots = useSelector((state) => state.spots.allSpots);
    // combine into one line? try ^v
    const allSpotsArray = Object.values(allSpots);

    useEffect(() => {
        dispatch(spotActions.loadAllSpots())
    }, [ dispatch ]);

    return (
        <div className='tile-list'>
          {allSpotsArray.map(spot =>
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              <SpotCard key={spot.id} spot={spot}></SpotCard>
            </NavLink>
          )}
        </div>
    );
}


export default Home;
